# Bài Tập Dev 011-1: Chuyển Đổi Controlled Form Sang React Hook Form (RHF)

Dự án Vite + React + TypeScript đáp ứng toàn bộ các yêu cầu:
1. **Chuyển 1 form controlled thủ công sang RHF**:
   - `ControlledForm.tsx`: Sử dụng `useState` thủ công (re-render component theo từng keystroke).
   - `RhfForm.tsx`: Chuyển đổi hoàn toàn sang `react-hook-form` thông qua `register`, quản lý uncontrolled inputs qua `ref`.
2. **Thêm disable submit & lỗi inline**:
   - Nút submit tự động `disabled={!isValid || isSubmitting}` khi dữ liệu chưa hợp lệ hoặc đang xử lý submit.
   - Lỗi validation (required, format email, minLength, maxLength) hiển thị inline ngay dưới mỗi input.
3. **Đảm bảo gõ không lag**:
   - Sử dụng cơ chế uncontrolled của RHF giúp form input không kích hoạt re-render component cha/form trên từng phím gõ (có counter đếm số lượt render trực quan để đối chiếu).

---

## Cách chạy dự án

Di chuyển vào thư mục `bai-tap-dev-011-1`:

```bash
cd bai-tap-dev-011-1
npm install
npm run dev
```

Mở trình duyệt tại đường dẫn hiển thị (thường là `http://localhost:5173`).
