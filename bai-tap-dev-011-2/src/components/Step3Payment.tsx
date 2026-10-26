import React from 'react'
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { BookingFormData } from '../schema'

interface Step3Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
  watch: UseFormWatch<BookingFormData>
}

export const Step3Payment: React.FC<Step3Props> = ({ register, errors, watch }) => {
  const paymentMethod = watch('paymentMethod')

  return (
    <div>
      <div className="form-group">
        <label htmlFor="paymentMethod">Hình thức thanh toán *</label>
        <select
          id="paymentMethod"
          className={errors.paymentMethod ? 'input-error' : ''}
          {...register('paymentMethod')}
        >
          <option value="credit_card">💳 Thẻ tín dụng / Ghi nợ quốc tế (Visa/Mastercard)</option>
          <option value="momo">📱 Ví điện tử MoMo</option>
          <option value="bank_transfer">🏦 Chuyển khoản ngân hàng trực tiếp (QR Code)</option>
        </select>
        {errors.paymentMethod && (
          <div className="inline-error">
            <span>⚠️</span>
            <span>{errors.paymentMethod.message}</span>
          </div>
        )}
      </div>

      {/* Thông tin thẻ nếu chọn Credit Card */}
      {paymentMethod === 'credit_card' && (
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="form-group">
            <label htmlFor="cardNumber">Số thẻ tín dụng (16 số) *</label>
            <input
              id="cardNumber"
              type="text"
              maxLength={19}
              placeholder="4111 2222 3333 4444"
              className={errors.cardNumber ? 'input-error' : ''}
              {...register('cardNumber')}
            />
            {errors.cardNumber && (
              <div className="inline-error">
                <span>⚠️</span>
                <span>{errors.cardNumber.message}</span>
              </div>
            )}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="cardExpiry">Hạn thẻ (MM/YY) *</label>
              <input
                id="cardExpiry"
                type="text"
                maxLength={5}
                placeholder="MM/YY (vd: 12/28)"
                className={errors.cardExpiry ? 'input-error' : ''}
                {...register('cardExpiry')}
              />
              {errors.cardExpiry && (
                <div className="inline-error">
                  <span>⚠️</span>
                  <span>{errors.cardExpiry.message}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cardCvc">Mã bảo mật CVC/CVV *</label>
              <input
                id="cardCvc"
                type="password"
                maxLength={4}
                placeholder="3 hoặc 4 số"
                className={errors.cardCvc ? 'input-error' : ''}
                {...register('cardCvc')}
              />
              {errors.cardCvc && (
                <div className="inline-error">
                  <span>⚠️</span>
                  <span>{errors.cardCvc.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'momo' && (
        <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', border: '1px dashed #ec4899', borderRadius: '8px', marginBottom: '1.25rem', color: '#f472b6', fontSize: '0.85rem' }}>
          📲 Sau khi bấm Hoàn tất, hệ thống sẽ chuyển hướng bạn đến cổng thanh toán bảo mật MoMo App.
        </div>
      )}

      {paymentMethod === 'bank_transfer' && (
        <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px dashed #38bdf8', borderRadius: '8px', marginBottom: '1.25rem', color: '#7dd3fc', fontSize: '0.85rem' }}>
          🏦 Thông tin tài khoản ngân hàng và mã QR chuyển khoản VietQR sẽ được tạo ngay khi xác nhận đơn.
        </div>
      )}

      <div className="checkbox-group">
        <input
          id="agreeTerms"
          type="checkbox"
          {...register('agreeTerms')}
        />
        <label htmlFor="agreeTerms">
          Tôi xác nhận đồng ý với Điều khoản dịch vụ và Chính sách huỷ/đổi phòng của khách sạn *
        </label>
      </div>
      {errors.agreeTerms && (
        <div className="inline-error" style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}>
          <span>⚠️</span>
          <span>{errors.agreeTerms.message}</span>
        </div>
      )}
    </div>
  )
}
