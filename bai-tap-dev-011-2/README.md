# Bài Tập Dev 011-2: Form Booking Nhiều Bước (Vite + React + TypeScript + Zod + RHF)

Ứng dụng đáp ứng trọn vẹn các yêu cầu bài toán:

### 1. Form Booking / Đăng ký nhiều bước (Multi-step Wizard)
- **Bước 1: Thông tin cá nhân** (Họ và tên, Email, Số điện thoại Việt Nam).
- **Bước 2: Chi tiết đặt phòng** (Loại phòng, Ngày nhận phòng, Ngày trả phòng, Số lượng khách, Yêu cầu đặc biệt).
- **Bước 3: Thanh toán & Xác nhận** (Phương thức thanh toán thẻ tín dụng / MoMo / Chuyển khoản, validate thẻ MM/YY, CVC, xác nhận điều khoản).
- Có thanh tiến trình (Stepper Bar) trực quan chỉ thị bước hiện tại, bước đã hoàn thành.

### 2. Zod validate đầy đủ Edge Cases
- **Edge cases ngày tháng**:
  - Không cho phép chọn ngày nhận phòng trong quá khứ (`< today`).
  - Ngày trả phòng bắt buộc phải sau ngày nhận phòng ít nhất 1 đêm.
- **Edge cases số điện thoại**:
  - Kiểm tra đúng định dạng số di động Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09).
- **Edge cases tên người dùng**:
  - Giới hạn từ 3 - 50 ký tự, hỗ trợ tiếng Việt có dấu, không cho phép ký tự đặc biệt lạ.
- **Edge cases thẻ tín dụng & phương thức thanh toán**:
  - Kiểm tra điều kiện có điều kiện (`superRefine`): chỉ khi chọn Thẻ tín dụng mới bắt buộc nhập 16 số, hạn thẻ hợp lệ (`MM/YY` và phải còn hạn tính tới tháng hiện tại), mã CVC (3-4 số).
- **Điều khoản bắt buộc**:
  - Checkbox điều khoản phải được tích chọn (`z.literal(true)`).

### 3. Lỗi rõ ràng & Gõ không lag
- Chế độ `mode: 'onTouched'` kết hợp cơ chế uncontrolled inputs của React Hook Form: **chỉ validate khi người dùng rời trường (blur) hoặc bấm chuyển bước**, không re-render form trên từng keystroke, đảm bảo gõ phím cực kỳ nhẹ nhàng mượt mà, không giật lag.
- Lỗi inline hiển thị sinh động và chi tiết ngay dưới từng trường dữ liệu với animation mượt mà.

---

## Hướng dẫn cài đặt & khởi chạy

Chạy lệnh trong terminal:

```bash
cd bai-tap-dev-011-2
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ hiển thị (mặc định: `http://localhost:5173`).
