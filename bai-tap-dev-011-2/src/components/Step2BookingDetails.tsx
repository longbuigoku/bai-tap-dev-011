import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { BookingFormData } from '../schema'

interface Step2Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
}

export const Step2BookingDetails: React.FC<Step2Props> = ({ register, errors }) => {
  return (
    <div>
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="roomType">Loại phòng nghỉ *</label>
          <select
            id="roomType"
            className={errors.roomType ? 'input-error' : ''}
            {...register('roomType')}
          >
            <option value="standard">Standard Cozy (1.200.000đ/đêm)</option>
            <option value="deluxe">Deluxe Ocean View (2.100.000đ/đêm)</option>
            <option value="suite">Executive Suite (3.800.000đ/đêm)</option>
            <option value="penthouse">Presidential Penthouse (7.500.000đ/đêm)</option>
          </select>
          {errors.roomType && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.roomType.message}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Số lượng khách *</label>
          <input
            id="guests"
            type="number"
            min={1}
            max={8}
            placeholder="1 - 8 khách"
            className={errors.guests ? 'input-error' : ''}
            {...register('guests')}
          />
          {errors.guests && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.guests.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="checkInDate">Ngày nhận phòng *</label>
          <input
            id="checkInDate"
            type="date"
            className={errors.checkInDate ? 'input-error' : ''}
            {...register('checkInDate')}
          />
          {errors.checkInDate && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.checkInDate.message}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="checkOutDate">Ngày trả phòng *</label>
          <input
            id="checkOutDate"
            type="date"
            className={errors.checkOutDate ? 'input-error' : ''}
            {...register('checkOutDate')}
          />
          {errors.checkOutDate && (
            <div className="inline-error">
              <span>⚠️</span>
              <span>{errors.checkOutDate.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Yêu cầu đặc biệt (tùy chọn)</label>
        <textarea
          id="specialRequests"
          rows={3}
          placeholder="Ví dụ: Phòng tầng cao, nôi em bé, check-in muộn..."
          className={errors.specialRequests ? 'input-error' : ''}
          {...register('specialRequests')}
        />
        {errors.specialRequests && (
          <div className="inline-error">
            <span>⚠️</span>
            <span>{errors.specialRequests.message}</span>
          </div>
        )}
      </div>
    </div>
  )
}
