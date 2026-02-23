# 1️⃣ Giải thích đơn giản (không biệt ngữ)

Hãy tưởng tượng code là một công ty.

Mỗi thứ cần **đặt tên rõ ràng để người khác nhìn vào biết nó là gì**.

## 📁 Tên file

- Viết thường hết.
- Các từ cách nhau bằng dấu `-`.
- File làm gì thì đặt tên đúng việc đó.

Ví dụ:

```
user-service.ts
auth-controller.ts
calculate-tax.ts
```

👉 Nhìn vào biết file đó làm gì.

---

## 🔤 Tên biến

- Viết thường chữ đầu.
- Mỗi từ sau viết hoa chữ cái đầu.
- Đặt tên có nghĩa.

Ví dụ:

```ts
let totalPrice = 1000;
let userName = "Minh";
```

👉 Biến là thứ “có thể thay đổi”, nên đặt tên như đang nói chuyện.

---

## 🏛 Tên class

- Viết hoa chữ cái đầu mỗi từ.
- Thường là danh từ.

Ví dụ:

```ts
class UserService {}
class PaymentProcessor {}
```

👉 Class giống như một “nhân viên” trong công ty.

---

## 📦 Tên interface / type

- Viết hoa chữ cái đầu mỗi từ.
- Không cần thêm chữ `I` phía trước (ví dụ `IUser` là không cần).

Ví dụ:

```ts
interface User {
  id: string;
  name: string;
}
```

👉 Interface giống như “bản mô tả công việc”.

---

## 🔒 Tên constant (giá trị không đổi)

- Nếu là biến dùng trong code: dùng giống biến.
- Nếu là hằng số toàn cục: viết hoa và dùng `_`.

Ví dụ:

```ts
const maxRetry = 3;
const API_TIMEOUT = 5000;
```

👉 Viết hoa khi muốn nói: “Đây là thứ không bao giờ đổi”.

---

# 2️⃣ Những điểm dễ gây nhầm lẫn

### ❗ 1. Có nên thêm `I` trước interface không?

Ví dụ:

```ts
interface IUser {}
```

Một số người thích, nhưng đa số dự án hiện đại không dùng nữa vì:

- TypeScript đã phân biệt rõ interface rồi.
- Thêm `I` làm tên dài và rối.

---

### ❗ 2. Khi nào dùng UPPER_CASE cho constant?

Sai:

```ts
const maxRetry = 3;
```

Đúng khi:

- Giá trị mang tính cấu hình hệ thống.
- Không bao giờ thay đổi.

Ví dụ:

```ts
const DEFAULT_PAGE_SIZE = 20;
```

Nhưng nếu chỉ là biến nội bộ trong hàm → không cần viết hoa.

---

### ❗ 3. File nên camelCase hay kebab-case?

Sai:

```
userService.ts
```

Đúng:

```
user-service.ts
```

Vì:

- Nhất quán với cộng đồng Node.js
- Dễ đọc hơn khi file dài

---

### ❗ 4. Enum nên đặt thế nào?

Nhiều người viết:

```ts
enum userStatus {}
```

Nhưng đúng phải:

```ts
enum UserStatus {}
```

Vì enum giống như một kiểu dữ liệu.

---

# 3️⃣ Viết lại cho rõ ràng hơn

Nếu tóm lại cực rõ ràng:

| Thứ cần đặt tên   | Cách đặt             | Ví dụ              |
| ----------------- | -------------------- | ------------------ |
| File              | chữ thường + dấu `-` | `user-service.ts`  |
| Biến              | camelCase            | `totalPrice`       |
| Hàm               | camelCase            | `calculateTotal()` |
| Class             | PascalCase           | `UserService`      |
| Interface         | PascalCase           | `User`             |
| Type              | PascalCase           | `UserRole`         |
| Enum              | PascalCase           | `OrderStatus`      |
| Constant toàn cục | UPPER_CASE           | `API_TIMEOUT`      |

---

# 4️⃣ Ví dụ thực tế dễ liên tưởng

Giả sử bạn đang xây hệ thống cho **Gal Chấm Công** (HRM system của bạn).

Bạn có:

## 📁 File

```
employee-service.ts
payroll-calculator.ts
attendance-controller.ts
```

## 👤 Interface

```ts
interface Employee {
  id: string;
  fullName: string;
  departmentId: string;
}
```

👉 Đây là “bản mô tả nhân viên”.

---

## 🏛 Class

```ts
class PayrollCalculator {
  calculateSalary(employee: Employee) {
    // ...
  }
}
```

👉 Đây là “nhân viên tính lương”.

---

## 🔢 Enum

```ts
enum AttendanceStatus {
  Present,
  Absent,
  Late,
}
```

👉 Đây là “bảng trạng thái chấm công”.

---

## 🔒 Constant

```ts
const DEFAULT_WORKING_DAYS = 22;
```

👉 Đây là luật công ty – không đổi.

---

# 🎯 Cách ghi nhớ đơn giản

Hãy nhớ 3 câu:

1. **File = viết thường + dấu gạch**
2. **Thứ gì là “kiểu” (class, interface, enum) = Viết Hoa Mỗi Từ**
3. **Thứ gì thay đổi = camelCase**
