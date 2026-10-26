import React, { useState, useRef } from 'react'
import { FormValues } from './types'

export const ControlledForm: React.FC = () => {
  const renderCount = useRef(0)
  renderCount.current += 1

  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    bio: '',
  })

  const [errors, setErrors] = useState<{ [K in keyof FormValues]?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)

  // Validate toàn bộ để kiểm tra disable button
  const validate = (formValues: FormValues) => {
    const errs: { [K in keyof FormValues]?: string } = {}
    if (!formValues.username.trim()) {
      errs.username = 'Vui lòng nhập tên người dùng'
    } else if (formValues.username.length < 3) {
      errs.username = 'Tên phải chứa ít nhất 3 ký tự'
    }

    if (!formValues.email.trim()) {
      errs.email = 'Vui lòng nhập địa chỉ email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      errs.email = 'Định dạng email không hợp lệ'
    }

    if (formValues.bio.length > 120) {
      errs.bio = 'Tiểu sử không được vượt quá 120 ký tự'
    }

    return errs
  }

  const currentErrors = validate(values)
  const isValid = Object.keys(currentErrors).length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updated = { ...values, [name]: value }
    setValues(updated)
    setErrors(validate(updated))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(values)
    setIsSubmitting(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <span>🐢 Controlled Form (Thủ công)</span>
        </h2>
        <span className="render-counter render-flash" key={renderCount.current}>
          Renders: {renderCount.current}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        Sử dụng <code>useState</code> thủ công cho từng ký tự. Mỗi khi người dùng gõ 1 phím, toàn bộ component này phải <strong>re-render lại</strong>.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className="form-group">
          <label htmlFor="ctrl-username">Tên người dùng *</label>
          <input
            id="ctrl-username"
            name="username"
            type="text"
            placeholder="vd: nguyenvana"
            value={values.username}
            onChange={handleChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.username}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="ctrl-email">Địa chỉ Email *</label>
          <input
            id="ctrl-email"
            name="email"
            type="email"
            placeholder="vd: user@example.com"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="form-group">
          <label htmlFor="ctrl-bio">Tiểu sử / Ghi chú</label>
          <textarea
            id="ctrl-bio"
            name="bio"
            rows={3}
            placeholder="Giới thiệu đôi nét..."
            value={values.bio}
            onChange={handleChange}
            className={errors.bio ? 'input-error' : ''}
          />
          {errors.bio && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.bio}</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin (Controlled)'}
        </button>
      </form>

      {submittedData && (
        <div className="success-alert">
          <span>✓</span>
          <span>Đã submit thành công: <strong>{submittedData.username}</strong> ({submittedData.email})</span>
        </div>
      )}

      <div className="info-box">
        ⚠️ <strong>Hạn chế của cách này:</strong>
        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
          <li>Khi form có nhiều trường phức tạp, mỗi keystroke kích hoạt re-render gây lag/chậm UI.</li>
          <li>Code validation và đồng bộ state thủ công cồng kềnh, dễ phát sinh lỗi logic.</li>
        </ul>
      </div>
    </div>
  )
}
