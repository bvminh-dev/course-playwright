
const PI = 3.14; // tên constant cho toàn hệ thống không bao giờ thay đổi thì viết hoa hết
const STUDENT_ONE_CLASS = 40;

var tenBienVar = "giatri var"; // Không được dùng var để khai báo biến

// ES6 - 2015 nó sinh ra let và const để thay thế var vì
let tenBienLet = "giatri let";
const tenBienConst = "giatri const";



try {
    tenBienLet = 10;
    console.log("gia tri của let:", tenBienLet);
} catch (error) {
    console.error(error)
}

try {
    const a = 1;
    tenBienConst = "10";
    console.log(tenBienConst);
} catch (error) {
    console.error(error)
}


class Animal { // viết hoa hết ký tự đầu mỗi từ, số ít

}

class LogFile {

}

// enum AIModule { // đặt tên như class, nhưng từ khóa ở đầu là enum
//     oneK = 1,
//     acne = 2
// }

const cong = 10 + 5;
const tru = 10 - 5;
const nhan = 10 * 5;
const chia = 10 / 5;
const soSanhHon = 10 > 5;
const soSanhLonHonBang = 10 >= 5;
const soSanhNhoHon = 10 < 5;
const soSanhNhoHonBang = 10 <= 5;

// hàm để in ra màn hình khi debug là console.log
console.log("debug ở đây", cong, tru, nhan, chia);

// các thao tác trên string
const congChuoi = "hello" + "world";
const khaiBaoString = 'hello World';
const khaiBaoStringTemplate = `Hello World!! 
- ${congChuoi}
- ${khaiBaoString}`;

console.log(khaiBaoStringTemplate);
const xxxxx = khaiBaoStringTemplate.replaceAll("World", "minhhhhh");
console.log(xxxxx);


// For có 2 kiểu hay dùng nhất là let of và let length -> cho phép lấy thứ tự element trong mảng. Còn let of không quan tâm đến thứ tự trong mảng
const listEmailCanTest = ["email", "email@gmail.com", "esdsjfshfsj%%@gmail.com"];
for (let i of listEmailCanTest) {
    console.log(i);
}

for (let index = 0; index < listEmailCanTest.length; index++) {
    const element = listEmailCanTest[index];
    console.log(element, index)
}

// switch case và else if
// else if dùng khi ít trường hợp xảy ra thường thì chỉ cho mệnh đề nếu thì
// switch case cho nhiều trường hợp xảy ra và switch case hoàn toàn có thể thay thế được if else
// const soDu = 10 % 2;
// if (soDu == 0) {
//     console.log("chia het");
// }
// else {
//     console.log("chia du")
// }

const soDuNhieuGiaTri = 1 % 7;
// level 1
// if (soDuNhieuGiaTri === 0) {
//     console.log("chiahet")
// }
// else if (soDuNhieuGiaTri === 1) {

//     console.log("chia du 1")
// }
// else if (soDuNhieuGiaTri === 2) {
//     console.log("chia du 2")
// }
// else if (soDuNhieuGiaTri === 3) {

//     console.log("chia du 3")
// }

// // level 2
switch (soDuNhieuGiaTri) {
    case 0:
        {
            console.log("du kho")
            break
        }
    case 1:
        {
            console.log("1")
            break
        }
    case 2:
        {
            console.log("2")
            break
        }
}

// level 3
const thongBao = {
    0: () => console.log("chia het"),
    1: () => console.log("chia du 1"),
    2: () => console.log("chia du 2"),
    3: () => console.log("chia du 3"),
}

thongBao[3]();

const listKey = Object.keys(thongBao)
const listValue = Object.values(thongBao)
console.log(listKey);
console.log(listValue);


// một object có
// - tên object được định nghĩa như tên biến chỉ là khác các dạng cơ bản là giá trị là dấu {}
// vd const a = {}
// - có key, mỗi key chứa giá trị của nó

// ------------- JS -------------
// 1. Cách đặt tên biến, tên file, tên class -> nêu ví dụ
// 2. Khác biệt của var, let, const -> mô tả chi tiết + ví dụ
// 3. Biết dùng string, template string -> nó là gì?, ví dụ + tìm hiểu các hàm được dùng trong string, lấy ví dụ như join,...
// 4. Mảng, duyệt mảng -> nêu khái niệm,ví dụ, tìm hiểu các hàm liên quan như include, find, findIndex, any, some...
// 5. Object -> lấy ví dụ, nêu khái niệm
// 6. Class và Enum -> nó là gì, nêu ví dụ

// Bài tập to: Quản lý lớp học với max số học sinh là 40 em. 
// Viết thêm sửa xóa học sinh, tìm kiếm học sinh theo tên. 
// 1 học sinh quản lý theo các tiêu trí sau: tên, ngày tháng năm sinh, toán văn anh, lấy ra em có tổng toán văn anh cao nhất
class TenClass {
    // constructor -> cách để tạo ra lớp đo, chỉ có 1 constructor trong 1 class

    // thuộc tính -> trả lời câu hỏi nó là gì

    // phương thức -> trả lời câu hỏi nó làm gì
}

// vd
class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    age() {
        const date = new Date();
        return date.getFullYear() - this.year;
    }
}

const myCar = new Car("Ford", 2014);
const oToCuaMinh = new Car(1999);
console.log(oToCuaMinh);