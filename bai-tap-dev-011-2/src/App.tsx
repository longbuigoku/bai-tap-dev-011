import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  fullBookingSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  BookingFormData,
} from './schema'
import { Step1PersonalInfo } from './components/Step1PersonalInfo'
import { Step2BookingDetails } from './components/Step2BookingDetails'
import { Step3Payment } from './components/Step3Payment'

const STEPS = [
  { id: 1, label: 'Thông tin cá nhân' },
  { id: 2, label: 'Chi tiết đặt phòng' },
  { id: 3, label: 'Thanh toán & Xác nhận' },
]

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null)

  const renderCount = useRef(0)
  renderCount.current += 1

  // Tính ngày check-in mặc định là ngày mai, check-out sau 2 ngày
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultCheckIn = tomorrow.toISOString().split('T')[0]

  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3)
  const defaultCheckOut = dayAfterTomorrow.toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(fullBookingSchema),
    mode: 'onTouched', // Đảm bảo gõ không lag: chỉ validate khi rời field (onBlur/onTouched) hoặc khi chuyển step
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      roomType: 'deluxe',
      checkInDate: defaultCheckIn,
      checkOutDate: defaultCheckOut,
      guests: 2,
      specialRequests: '',
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      agreeTerms: false as unknown as true,
    },
  })

  // Validate theo từng bước với schema con tương ứng
  const validateCurrentStep = async (): Promise<boolean> => {
    if (currentStep === 1) {
      return await trigger(['fullName', 'email', 'phone'])
    }
    if (currentStep === 2) {
      return await trigger(['roomType', 'checkInDate', 'checkOutDate', 'guests', 'specialRequests'])
    }
    if (currentStep === 3) {
      return await trigger(['paymentMethod', 'cardNumber', 'cardExpiry', 'cardCvc', 'agreeTerms'])
    }
    return true
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: BookingFormData) => {
    // Giả lập API booking
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmittedData(data)
    setIsSuccess(true)
  }

  const handleReset = () => {
    reset()
    setIsSuccess(false)
    setSubmittedData(null)
    setCurrentStep(1)
  }

  return (
    <div className="container">
      <header>
        <div className="badge">Vite • React • TypeScript • Zod • RHF</div>
        <h1>Hệ Thống Đặt Phòng Khách Sạn</h1>
        <p className="subtitle">
          Form đăng ký đặt phòng nhiều bước chuẩn chỉnh. Validate đầy đủ edge cases qua Zod, không lag và báo lỗi inline chính xác.
        </p>
      </header>

      {/* Stepper Bar */}
      <div className="stepper-container">
        <div className="stepper-track">
          <div
            className="stepper-progress"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id || isSuccess
          const isActive = currentStep === step.id && !isSuccess

          return (
            <div
              key={step.id}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-circle">
                {isCompleted ? '✓' : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          )
        })}
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">
            {isSuccess
              ? 'Đặt phòng thành công!'
              : `Bước ${currentStep}: ${STEPS[currentStep - 1].label}`}
          </h2>
          <span className="render-counter">
            Renders: {renderCount.current}
          </span>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Step content */}
            {currentStep === 1 && (
              <Step1PersonalInfo register={register} errors={errors} />
            )}

            {currentStep === 2 && (
              <Step2BookingDetails register={register} errors={errors} />
            )}

            {currentStep === 3 && (
              <Step3Payment register={register} errors={errors} watch={watch} />
            )}

            {/* Navigation buttons */}
            <div className="button-row">
              <button
                type="button"
                className="btn-secondary"
                onClick={handlePrev}
                disabled={currentStep === 1 || isSubmitting}
              >
                ← Quay lại
              </button>

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNext}
                >
                  Tiếp tục →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xác nhận đặt phòng...' : 'Xác nhận đặt phòng 🚀'}
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="success-screen">
            <div className="success-badge-icon">✓</div>
            <h3>Yêu cầu đặt phòng đã hoàn tất!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Mã xác nhận booking đã được gửi tới email <strong>{submittedData?.email}</strong>.
            </p>

            {submittedData && (
              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Khách hàng:</span>
                  <span className="summary-value">{submittedData.fullName}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Số điện thoại:</span>
                  <span className="summary-value">{submittedData.phone}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Hạng phòng:</span>
                  <span className="summary-value" style={{ textTransform: 'capitalize' }}>
                    {submittedData.roomType}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Thời gian lưu trú:</span>
                  <span className="summary-value">
                    {submittedData.checkInDate} ➔ {submittedData.checkOutDate}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Số lượng khách:</span>
                  <span className="summary-value">{submittedData.guests} người</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Thanh toán:</span>
                  <span className="summary-value" style={{ textTransform: 'uppercase' }}>
                    {submittedData.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                {submittedData.specialRequests && (
                  <div className="summary-row">
                    <span className="summary-label">Yêu cầu đặc biệt:</span>
                    <span className="summary-value">{submittedData.specialRequests}</span>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="btn-primary"
              style={{ margin: '0 auto' }}
              onClick={handleReset}
            >
              Tạo đơn đặt phòng mới
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
