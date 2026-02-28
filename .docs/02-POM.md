## 1) Giải thích đơn giản (không dùng biệt ngữ)

Hãy tưởng tượng bạn đang viết test cho một trang web bằng **Playwright**.
Nếu mỗi test đều tự đi tìm nút bấm, ô nhập, tự viết cách đăng nhập… thì code sẽ rất lặp lại và rối.

**POM (Page Object Model)** là cách bạn gom tất cả “những thứ liên quan đến một trang” vào một chỗ riêng.

Ví dụ:

- Trang đăng nhập có:
  - Ô nhập username
  - Ô nhập password
  - Nút login

Thay vì mỗi test tự tìm và bấm từng thứ, bạn tạo một “đối tượng trang đăng nhập” có sẵn:

- hàm `login(username, password)`
- hàm `enterUsername()`
- hàm `enterPassword()`

Sau đó trong test bạn chỉ cần viết:

> “Trang đăng nhập → login với tài khoản này”

Tức là:

- Test chỉ nói “muốn làm gì”
- Còn cách làm cụ thể để ở trong file trang đó

👉 POM giúp code:

- Gọn hơn
- Dễ sửa hơn
- Ít lặp lại

---

## 2) Những lỗ hổng / điểm dễ gây nhầm lẫn

### ❗ Nhầm lẫn 1: POM là framework?

Không.
POM chỉ là **cách tổ chức code**, không phải công cụ riêng của Playwright.

---

### ❗ Nhầm lẫn 2: POM chỉ để gom selector?

Sai một nửa.
Nếu bạn chỉ gom selector vào 1 file thì chưa đủ.

POM đúng nghĩa là:

- Gom **hành động** (click, nhập, submit)
- Không chỉ gom “địa chỉ của nút bấm”

---

### ❗ Nhầm lẫn 3: Cái gì cũng nhét vào Page

Nhiều người:

- Nhét luôn logic test (assertion) vào Page
  → Sai hướng.

Page chỉ nên:

- Biết cách thao tác trang
- Không nên quyết định “kết quả đúng hay sai”

---

### ❗ Nhầm lẫn 4: POM lúc nào cũng tốt?

Không hẳn.

Nếu dự án:

- Rất nhỏ
- Chỉ 2–3 test

Thì POM có thể làm code phức tạp hơn cần thiết.

---

### ❗ Nhầm lẫn 5: Cứ tách file là thành POM

Không phải.

Nếu bạn chỉ tách file mà vẫn để test chứa đầy selector và logic lộn xộn → đó chưa phải POM đúng nghĩa.

POM đúng nghĩa là:

- Trang chứa selector
- Trang chứa hành động
- Test chỉ chứa kịch bản

---

### ❗ Nhầm lẫn 6: POM giúp test chạy nhanh hơn

Không.
POM chỉ giúp code dễ bảo trì và mở rộng hơn, không giúp tăng tốc.

---

### ❗ Nhầm lẫn 7: Càng nhiều class càng tốt

Không.
Tạo quá nhiều lớp phức tạp sẽ làm test khó hiểu.
POM nên đơn giản, vừa đủ.

## 3) Viết lại lời giải thích cho rõ ràng hơn

POM trong Playwright là cách:

> Mỗi trang web được đại diện bởi một class (hoặc file) riêng.
> File đó chịu trách nhiệm mô tả:
>
> - Trang có những thành phần gì
> - Người dùng có thể làm gì trên trang

Test case sẽ:

- Không trực tiếp thao tác vào nút hay ô input
- Mà gọi các hàm từ Page Object

Sự tách biệt này giúp:

| Test              | Page                   |
| ----------------- | ---------------------- |
| Nói “muốn làm gì” | Biết “làm như thế nào” |

Ví dụ:

Test nói:

> “Đăng nhập với tài khoản admin”

Page chịu trách nhiệm:

- Điền username
- Điền password
- Click login

---

## 4) Ví dụ thực tế dễ liên tưởng

### 📦 Ví dụ: Gọi đồ ăn qua app

Bạn không:

- Vào bếp
- Mở tủ lạnh
- Tự chiên trứng

Bạn chỉ:

> “Cho tôi 1 phần cơm rang”

Nhà bếp biết:

- Lấy gạo ở đâu
- Cho gia vị gì
- Nấu trong bao lâu

Trong ví dụ này:

| Thực tế       | Trong Playwright |
| ------------- | ---------------- |
| Khách gọi món | Test case        |
| Nhà bếp       | Page Object      |
| Công thức nấu | Logic thao tác   |
| Món ăn        | Kết quả          |

---

### 📌 Ví dụ code đơn giản

```ts
// login.page.ts
export class LoginPage {
  constructor(private page) {}

  async login(username: string, password: string) {
    await this.page.fill("#username", username);
    await this.page.fill("#password", password);
    await this.page.click("#login");
  }
}
```

```ts
// login.spec.ts
test("User can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("admin", "123456");
});
```

Ở đây:

- Test không cần biết selector là gì
- Nếu UI đổi id → chỉ sửa trong `LoginPage`

---

## 🔥 Kết luận gọn theo kiểu Feynman

POM =

> “Mỗi trang web là một người trợ lý riêng.
> Test chỉ ra lệnh.
> Trợ lý biết phải bấm nút nào.”

Nếu bạn hiểu được câu đó, bạn đã hiểu POM đúng bản chất.

---

Nếu bạn muốn, tôi có thể:

- Giải thích POM theo góc nhìn Clean Architecture
- Hoặc so sánh POM vs Screenplay Pattern để bạn hiểu sâu hơn.
