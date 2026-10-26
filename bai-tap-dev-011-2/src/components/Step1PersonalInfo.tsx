import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { BookingFormData } from '../schema'

interface Step1Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
}

export const Step1PersonalInfo: React.FC<Step1Props> = ({ register, errors }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="fullName">Họ và tên *</label>
        <input
          id="fullName"
          type="text"
          placeholder="vd: Nguyễn Văn An"
          className={errors.fullName ? 'input-error' : ''}
          {...register('fullName')}
        />
        {errors.fullName && (
          <div className="inline-error">
            <span>⚠️</span>
            <span>{errors.fullName.message}</span>
          </div>
        )}
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="email">Địa chỉ Email *</label>
          <input
            id="email"
            type="email"
            placeholder="vd: an.nguyen@example.com"
            className={errors.email ? 'input-error' : ''}
            {...register('email')}
          />
          {errors.email && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại *</label>
          <input
            id="phone"
            type="tel"
            placeholder="vd: 0912345678"
            className={errors.phone ? 'input-error' : ''}
            {...register('phone')}
          />
          {errors.phone && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.phone.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
