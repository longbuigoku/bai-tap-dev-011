import React from 'react'
import { ControlledForm } from './ControlledForm'
import { RhfForm } from './RhfForm'

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
        <div className="badge-tag">Vite + React + TypeScript + RHF</div>
        <h1>Tối Ưu Form Với React Hook Form</h1>
        <p className="subtitle">
          So sánh trực quan giữa Form Controlled thủ công (re-render mỗi phím gõ) và Form chuyển đổi sang React Hook Form (gõ mượt mà, không lag, kiểm soát lỗi inline và disable submit).
        </p>
      </header>

      <div className="grid-comparison">
        <ControlledForm />
        <RhfForm />
      </div>
    </div>
  )
}

export default App
