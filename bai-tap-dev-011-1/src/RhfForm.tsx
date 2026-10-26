import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FormValues } from './types'

export const RhfForm: React.FC = () => {
  const renderCount = useRef(0)
  renderCount.current += 1

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange', // Validate on change so isValid updates dynamically
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  })

  const [submittedData, setSubmittedData] = React.useState<FormValues | null>(null)

  const onSubmit = async (data: FormValues) => {
    // Giả lập call API async
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
    reset(data)
  }

  return (
    <div className="card highlight">
      <div className="card-header">
        <h2 className="card-title">
          <span>⚡ React Hook Form (RHF)</span>
        </h2>
        <span className="render-counter render-flash" key={renderCount.current}>
          Renders: {renderCount.current}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        Sử dụng uncontrolled inputs qua <code>ref</code>. Component <strong>không bị re-render</strong> liên tục mỗi khi gõ phím, đảm bảo gõ siêu mượt & không lag!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username field */}
        <div className="form-group">
          <label htmlFor="rhf-username">Tên người dùng *</label>
          <input
            id="rhf-username"
            type="text"
            placeholder="vd: nguyenvana"
            className={errors.username ? 'input-error' : ''}
            {...register('username', {
              required: 'Vui lòng nhập tên người dùng',
              minLength: {
                value: 3,
                message: 'Tên phải chứa ít nhất 3 ký tự',
              },
            })}
          />
          {errors.username && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.username.message}</span>
            </div>
          )}
        </div>

        {/* Email field */}
        <div className="form-group">
          <label htmlFor="rhf-email">Địa chỉ Email *</label>
          <input
            id="rhf-email"
            type="email"
            placeholder="vd: user@example.com"
            className={errors.email ? 'input-error' : ''}
            {...register('email', {
              required: 'Vui lòng nhập địa chỉ email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Định dạng email không hợp lệ',
              },
            })}
          />
          {errors.email && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Bio field */}
        <div className="form-group">
          <label htmlFor="rhf-bio">Tiểu sử / Ghi chú</label>
          <textarea
            id="rhf-bio"
            rows={3}
            placeholder="Giới thiệu đôi nét..."
            className={errors.bio ? 'input-error' : ''}
            {...register('bio', {
              maxLength: {
                value: 120,
                message: 'Tiểu sử không được vượt quá 120 ký tự',
              },
            })}
          />
          {errors.bio && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.bio.message}</span>
            </div>
          )}
        </div>

        {/* Submit button with disable logic */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin (RHF)'}
        </button>
      </form>

      {submittedData && (
        <div className="success-alert">
          <span>✓</span>
          <span>Đã submit thành công: <strong>{submittedData.username}</strong> ({submittedData.email})</span>
        </div>
      )}

      <div className="info-box">
        💡 <strong>Điểm tối ưu:</strong>
        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
          <li>Submit bị vô hiệu hóa (disabled) khi form chưa hợp lệ (<code>!isValid</code>) hoặc đang submit.</li>
          <li>Thông báo lỗi inline hiển thị ngay bên dưới trường nhập dữ liệu.</li>
          <li>Số lượt render giữ ở mức tối thiểu tuyệt đối khi nhập liệu.</li>
        </ul>
      </div>
    </div>
  )
}
