import { z } from 'zod'

// Helper regex cho số điện thoại VN (10 số, bắt đầu bằng 03, 05, 07, 08, 09)
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

export const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Họ và tên không được để trống')
    .min(3, 'Họ và tên tối thiểu 3 ký tự')
    .max(50, 'Họ và tên không vượt quá 50 ký tự')
    .regex(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
  email: z
    .string()
    .trim()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ (ví dụ: ten@mien.com)'),
  phone: z
    .string()
    .trim()
    .min(1, 'Số điện thoại không được để trống')
    .regex(phoneRegex, 'Số điện thoại Việt Nam không hợp lệ (10 số, đầu 03/05/07/08/09)'),
})

export const step2Schema = z
  .object({
    roomType: z.enum(['standard', 'deluxe', 'suite', 'penthouse'], {
      errorMap: () => ({ message: 'Vui lòng chọn loại phòng' }),
    }),
    checkInDate: z
      .string()
      .min(1, 'Vui lòng chọn ngày nhận phòng'),
    checkOutDate: z
      .string()
      .min(1, 'Vui lòng chọn ngày trả phòng'),
    guests: z.coerce
      .number({ invalid_type_error: 'Số lượng khách phải là số' })
      .int('Số lượng khách phải là số nguyên')
      .min(1, 'Tối thiểu 1 khách')
      .max(8, 'Tối đa 8 khách trong 1 phòng'),
    specialRequests: z
      .string()
      .max(250, 'Yêu cầu đặc biệt không vượt quá 250 ký tự')
      .optional()
      .default(''),
  })
  .superRefine((data, ctx) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (data.checkInDate) {
      const checkIn = new Date(data.checkInDate)
      checkIn.setHours(0, 0, 0, 0)
      if (isNaN(checkIn.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['checkInDate'],
          message: 'Ngày nhận phòng không hợp lệ',
        })
      } else if (checkIn < today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['checkInDate'],
          message: 'Ngày nhận phòng không được ở quá khứ',
        })
      }
    }

    if (data.checkInDate && data.checkOutDate) {
      const checkIn = new Date(data.checkInDate)
      const checkOut = new Date(data.checkOutDate)
      checkIn.setHours(0, 0, 0, 0)
      checkOut.setHours(0, 0, 0, 0)

      if (isNaN(checkOut.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['checkOutDate'],
          message: 'Ngày trả phòng không hợp lệ',
        })
      } else if (checkOut <= checkIn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['checkOutDate'],
          message: 'Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 đêm',
        })
      }
    }
  })

export const step3Schema = z
  .object({
    paymentMethod: z.enum(['credit_card', 'momo', 'bank_transfer'], {
      errorMap: () => ({ message: 'Vui lòng chọn phương thức thanh toán' }),
    }),
    cardNumber: z.string().optional().default(''),
    cardExpiry: z.string().optional().default(''),
    cardCvc: z.string().optional().default(''),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'Bạn phải đồng ý với điều khoản & chính sách huỷ' }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit_card') {
      const cleanCard = (data.cardNumber || '').replace(/\s+/g, '')
      if (!/^\d{16}$/.test(cleanCard)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardNumber'],
          message: 'Thẻ tín dụng phải gồm đủ 16 chữ số',
        })
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry || '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardExpiry'],
          message: 'Hạn thẻ phải đúng định dạng MM/YY (vd: 08/28)',
        })
      } else {
        const [monthStr, yearStr] = data.cardExpiry.split('/')
        const month = parseInt(monthStr, 10)
        const year = 2000 + parseInt(yearStr, 10)
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['cardExpiry'],
            message: 'Thẻ đã hết hạn sử dụng',
          })
        }
      }

      if (!/^\d{3,4}$/.test(data.cardCvc || '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardCvc'],
          message: 'Mã CVC phải gồm 3 hoặc 4 chữ số',
        })
      }
    }
  })

// Hợp nhất toàn bộ schema để validate form submit cuối cùng
export const fullBookingSchema = step1Schema.and(step2Schema).and(step3Schema)

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type BookingFormData = z.infer<typeof fullBookingSchema>
