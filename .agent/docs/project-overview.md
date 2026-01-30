# Tổng Quan Dự Án - Playwright Automation Framework

## Giới Thiệu Dự Án

Đây là một framework tự động hóa kiểm thử end-to-end (E2E) được xây dựng bằng **Playwright** và **TypeScript**, tuân theo các best practices trong test automation. Framework này được thiết kế để kiểm thử một form đa bước trên website, bao gồm các bước: nhập ZIP code, chọn lý do quan tâm, chọn loại tài sản, nhập thông tin liên hệ, và nhập số điện thoại.

### Công Nghệ Sử Dụng

- **Playwright**: Framework tự động hóa trình duyệt
- **TypeScript**: Ngôn ngữ lập trình với type safety
- **Page Object Model (POM)**: Pattern thiết kế để tổ chức code
- **Allure Reporting**: Hệ thống báo cáo test đẹp mắt
- **Docker**: Containerization để chạy test trong môi trường nhất quán
- **GitHub Actions**: CI/CD pipeline
- **Faker.js**: Thư viện tạo dữ liệu test giả

## Cấu Trúc Thư Mục và Mô Tả File

### 📁 Root Files

#### `package.json`
File cấu hình npm chứa metadata của project, dependencies, và scripts:
- **Scripts chính**:
  - `test`: Chạy test ở chế độ headed với 2 workers
  - `test:headless`: Chạy test ở chế độ headless
  - `test:ci`: Chạy test cho CI với 1 worker và 2 retries
  - `test:docker`: Chạy test trong Docker container
  - `docker:build`: Build Docker image
  - `allure-result`: Generate Allure report
  - `allure-report`: Mở Allure report
  - `report`: Generate và mở report
  - `type:check`: Kiểm tra TypeScript types
- **Dependencies**: @playwright/test, @faker-js/faker, allure-playwright, typescript

#### `tsconfig.json`
Cấu hình TypeScript compiler:
- Target: ES2022
- Module: CommonJS
- Strict mode: Bật
- **Path aliases**:
  - `@pages/*` → `pages/*`
  - `@components` → `core/BasePage.ts`
  - `@config` → `config/timeouts.ts`
  - `@interfaces` → `interfaces/*`
  - `@data` → `data/index.ts`
  - `@fixtures` → `fixtures/index.ts`

#### `playwright.config.ts`
File cấu hình chính của Playwright:
- **Projects**: Hỗ trợ Chrome, Firefox, Safari (có thể chọn qua env BROWSER)
- **Test directory**: `./tests`
- **Test match**: `**/*.spec.ts`
- **Parallel execution**: Bật
- **Timeout**: 60 giây
- **Reporters**: List reporter và Allure reporter
- **Screenshots/Videos**: Chỉ capture khi test fail
- **Base URL**: Được import từ `config/urls.ts`

#### `README.md`
Tài liệu hướng dẫn sử dụng framework, bao gồm:
- Cài đặt và setup
- Cách chạy test
- Cấu trúc framework
- Best practices
- Hướng dẫn mở rộng framework

#### `Dockerfile`
File để build Docker image:
- Base image: `mcr.microsoft.com/playwright:v1.57.0-noble`
- Copy package files và install dependencies
- Copy toàn bộ project
- Set CI=true
- Default command: `npm run test:ci`

#### `docker-compose.yml`
Cấu hình Docker Compose:
- Service `playwright` với build từ Dockerfile
- Environment variables: CI, BROWSER (mặc định: chrome)
- Volumes: Mount `allure/` và `test-results/` để lưu kết quả
- Shared memory: 2GB

#### `.gitignore`
Danh sách files/folders bị ignore bởi Git:
- `node_modules/`
- `test-results/`
- `playwright-report/`
- `allure/`
- `.env`
- `.DS_Store`
- `*.log`

#### `.dockerignore`
Danh sách files/folders không được copy vào Docker image:
- Tương tự `.gitignore` nhưng thêm `.git` và các thư mục allure results/reports

---

### 📁 `.agent/docs/`

#### `project-overview.md` (File này)
Tài liệu tổng quan về dự án, mô tả chức năng của từng file.

---

### 📁 `.claude/agents/`

Thư mục chứa các agent definitions cho Claude:
- `playwright-test-generator.md`: Agent để generate test cases
- `playwright-test-healer.md`: Agent để sửa test bị lỗi
- `playwright-test-planner.md`: Agent để lập kế hoạch test

---

### 📁 `.github/workflows/`

#### `playwright.yml`
GitHub Actions workflow:
- **Trigger**: Manual workflow dispatch
- **Input**: Browser selection (Chrome, Firefox, Safari, All)
- **Jobs**:
  - `test`: Chạy test với sharding (4 shards) và matrix strategy cho nhiều browsers
  - `merge-reports`: Merge Allure results từ tất cả shards và browsers
- **Artifacts**: Upload test results và Allure results

---

### 📁 `config/`

#### `index.ts`
File export tập trung, re-export tất cả từ `timeouts.ts` và `urls.ts`.

#### `timeouts.ts`
Định nghĩa các timeout constants:
- `short`: 5000ms (5 giây)
- `medium`: 10000ms (10 giây)
- `long`: 30000ms (30 giây)
- `veryLong`: 60000ms (60 giây)

#### `urls.ts`
Định nghĩa base URL của ứng dụng:
- `baseURL`: "https://test-qa.capslock.global"

---

### 📁 `core/`

#### `BasePage.ts`
Lớp cơ sở cho tất cả Page Objects:
- **Properties**: `page: Page`
- **Methods**:
  - `locator(selector)`: Tạo locator từ selector string
  - `navigateTo(url)`: Điều hướng đến URL với waitUntil: "domcontentloaded"
  - `waitForUrlContains(desiredUrl, timeout)`: Đợi URL chứa pattern mong muốn
  - `waitFor(locator, state, timeout)`: Đợi element đạt state (visible/hidden/attached/detached)
  - `click(locator)`: Click vào element
  - `fill(locator, value)`: Fill input field (click trước rồi fill)

---

### 📁 `pages/`

#### `LandingPage.ts`
Page Object cho trang landing page chứa form đa bước:
- **Locators**:
  - `formContainer`: Container chứa form (`#form-container-1`)
  - `stepTitle`: Tiêu đề của step hiện tại (readonly)
  - `errorMessage`: Thông báo lỗi (readonly)
  - `zipCodeInput`: Input ZIP code
  - `nameInput`: Input tên
  - `emailInput`: Input email
  - `phoneInput`: Input số điện thoại
  - `nextButton`: Nút "Next"
  - `goToEstimateButton`: Nút "Go To Estimate"
  - `submitRequestButton`: Nút "Submit Your Request"
- **Methods**:
  - `goto()`: Điều hướng đến landing page và đợi stepTitle hiển thị
  - `clickNext()`: Click nút Next
  - `clickGoToEstimate()`: Click nút Go To Estimate
  - `clickSubmitYourRequest()`: Click nút Submit Your Request
  - `fillZipCode({ zipCode })`: Điền ZIP code
  - `fillName({ name })`: Điền tên
  - `fillEmail({ email })`: Điền email
  - `fillPhone({ phone })`: Điền số điện thoại
  - `selectInterestReasons({ interests })`: Chọn các lý do quan tâm (có thể nhiều)
  - `selectPropertyType({ propertyType })`: Chọn loại tài sản
  - `submitZipCodeStep({ formDetails })`: Submit step ZIP code
  - `submitInterestStep({ formDetails })`: Submit step chọn lý do quan tâm
  - `submitPropertyTypeStep({ formDetails })`: Submit step chọn loại tài sản
  - `submitContactInfoStep({ formDetails })`: Submit step thông tin liên hệ
  - `submitPhoneStep({ formDetails })`: Submit step số điện thoại

#### `ThankYouPage.ts`
Page Object cho trang cảm ơn sau khi submit form thành công:
- **Properties**:
  - `heading`: Locator cho heading (readonly)
  - `thankYouUrl`: URL của trang thank you (readonly)
- **Methods**:
  - `waitForThankYouPage()`: Đợi chuyển đến trang thank you

---

### 📁 `interfaces/`

#### `FormDetailsInterface.ts`
TypeScript interface định nghĩa cấu trúc dữ liệu form:
```typescript
{
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  interests: string[];
  propertyType: string;
}
```

---

### 📁 `data/`

#### `index.ts`
File export tập trung, re-export tất cả data modules:
- FormDetails
- interests
- propertyTypes
- emails
- phones
- urlPaths
- zipCodes
- stepTitles

#### `FormDetails.ts`
Function factory tạo dữ liệu form giả bằng Faker.js:
- `FormDetails()`: Trả về object FormDetailsInterface với:
  - firstName, lastName: Từ faker.person
  - fullName: Kết hợp firstName + lastName
  - email: Email từ faker.internet với provider "yopmail.com"
  - phone: 10 chữ số từ faker.string.numeric
  - zipCode: 5 chữ số từ faker.location.zipCode
  - interests: Import từ `interests.ts`
  - propertyType: OWNED_HOUSE từ `propertyTypes.ts`

#### `emails.ts`
Danh sách các email không hợp lệ để test validation:
- `invalidEmails`: Array các email format sai (thiếu @, có khoảng trắng, rỗng, etc.)

#### `interests.ts`
Danh sách các lý do quan tâm:
- `interests`: ["Independence", "Safety", "Therapy", "Other"]

#### `propertyTypes.ts`
Object chứa các loại tài sản:
- `OWNED_HOUSE`: "Owned House / Condo"
- `RENTAL`: "Rental Property"
- `MOBILE_HOME`: "Mobile Home"

#### `urlPaths.ts`
Object chứa các URL paths:
- `LandingPage`: "/"
- `thankYou`: "thank"

#### `stepTitles.ts`
Object chứa các tiêu đề step để verify:
- `zipCode`: "What is your ZIP Code?"
- `interest`: "Why are you interested in a walk-in tub?"
- `propertyType`: "What type of property is this"
- `contactInfo`: "Who should we prepare this FREE estimate for?"
- `lastStep`: "LAST STEP!"

#### `phones.ts`
File chứa dữ liệu số điện thoại (nếu có).

#### `zipCodes.ts`
File chứa dữ liệu ZIP codes (nếu có).

---

### 📁 `fixtures/`

#### `index.ts`
File export tập trung, re-export `test` và `expect` từ `testFixtures.ts`.

#### `testFixtures.ts`
Custom Playwright fixtures:
- Extend base `test` fixture với:
  - `landingPage`: Instance của LandingPage
  - `thankYouPage`: Instance của ThankYouPage
- Export `expect` từ @playwright/test
- Mỗi fixture tự động khởi tạo page object tương ứng và pass vào test

---

### 📁 `tests/`

#### `valid-form-submission.spec.ts`
Test case kiểm thử submit form thành công:
- **Describe**: "Form submission"
- **BeforeEach**: Navigate đến landing page
- **Test**: Submit tất cả các steps và verify chuyển đến thank you page với heading "Thank you!"

#### `invalid-email.spec.ts`
Test case kiểm thử validation email không hợp lệ:
- **Describe**: "Invalid email validation"
- **BeforeEach**: Navigate và submit đến step contact info
- **Test**: Loop qua `invalidEmails`, điền email không hợp lệ và verify không chuyển step

#### `invalid-name.spec.ts`
Test case kiểm thử validation tên không hợp lệ (tương tự invalid-email).

#### `invalid-phone.spec.ts`
Test case kiểm thử validation số điện thoại không hợp lệ.

#### `invalid-zip-code.spec.ts`
Test case kiểm thử validation ZIP code không hợp lệ.

#### `required-fields-validation.spec.ts`
Test case kiểm thử các trường bắt buộc:
- ZIP code là required
- Name và email là required
- Email required khi đã điền name
- Phone là required ở step cuối

---

## Luồng Hoạt Động

### Luồng Test Cơ Bản

1. **Setup**: Test fixtures khởi tạo page objects (LandingPage, ThankYouPage)
2. **BeforeEach**: Navigate đến landing page
3. **Test Steps**:
   - Submit ZIP code step
   - Submit interest selection step
   - Submit property type step
   - Submit contact info step (name + email)
   - Submit phone step
4. **Verification**: Verify chuyển đến thank you page và hiển thị đúng message

### Luồng CI/CD

1. **GitHub Actions Trigger**: Manual workflow dispatch với browser selection
2. **Test Execution**: 
   - Install dependencies
   - Run tests với sharding (4 shards) và matrix (multiple browsers)
   - Upload artifacts
3. **Report Merging**: Merge Allure results từ tất cả shards
4. **Artifact Storage**: Lưu merged results trong 30 ngày

### Luồng Docker

1. **Build**: Build image từ Dockerfile
2. **Run**: Execute tests trong container với volumes mount
3. **Results**: Test results và Allure reports được lưu vào local directories

---

## Best Practices Được Áp Dụng

1. **Page Object Model**: Tách biệt page interactions và test logic
2. **TypeScript**: Type safety và IDE support tốt hơn
3. **Custom Fixtures**: Reusable test setup
4. **Data-Driven Testing**: Test data tách riêng, dễ maintain
5. **No Hardcoded Waits**: Sử dụng Playwright auto-waiting
6. **Constructor Locators**: Locators khởi tạo trong constructor (official Playwright pattern)
7. **Path Aliases**: Import paths ngắn gọn và dễ đọc
8. **Test Isolation**: Mỗi test chạy độc lập
9. **Assertions in Tests**: Page objects không chứa assertions
10. **Descriptive Names**: Tên test và methods rõ ràng, mô tả behavior

---

## Cách Mở Rộng Framework

### Thêm Page Object Mới

1. Tạo file trong `pages/`
2. Extend `BasePage`
3. Khai báo locators là readonly properties
4. Khởi tạo locators trong constructor
5. Thêm action methods

### Thêm Fixture Mới

1. Update `fixtures/testFixtures.ts`
2. Thêm type vào generic type parameter
3. Thêm fixture implementation với async function

### Thêm Test Case Mới

1. Tạo file `.spec.ts` trong `tests/`
2. Import `test`, `expect` từ `@fixtures`
3. Import data từ `@data`
4. Sử dụng page objects từ fixtures
5. Viết test với describe và test blocks

---

## Tổng Kết

Framework này cung cấp một cấu trúc rõ ràng, dễ maintain và mở rộng cho việc tự động hóa kiểm thử E2E. Với Page Object Model, TypeScript, và các best practices, framework giúp viết test dễ dàng, đọc được, và ít lỗi hơn. Hệ thống CI/CD và Docker support đảm bảo tests có thể chạy trong môi trường nhất quán và tự động hóa.
