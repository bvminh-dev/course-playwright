let a = 1;
const a2: number = 1;

const b = "2";
const b2: string = "2";

const c = true;
const c2: boolean = true;

const d = [1, 2, 3];
const d2: number[] = [1, 2, 3];
const d3: string[] = ["1", "2", "3"];

let anyValue: any; // – “Muốn làm gì thì làm”
anyValue = 1;
anyValue = "2";
anyValue = true;
anyValue = [1, 2, 3];
anyValue = { name: "John Doe", age: 20 };
anyValue = () => {
    return "Hello World";
};

let valueAny: any = "hello";

valueAny = 123;
if (typeof valueAny === "string") {
    valueAny.toUpperCase();
}
// valueAny.toUpperCase(); // ❌ Không lỗi compile, nhưng runtime có thể crash

let unknownValue: unknown; // “Tôi chưa biết, phải kiểm tra đã”
unknownValue = 1;
unknownValue = "2";
unknownValue = true;
unknownValue = [1, 2, 3];
unknownValue = { name: "John Doe", age: 20 };
unknownValue = () => {
    return "Hello World";
};

let valueUnknown: unknown = "hello";

// valueUnknown.toUpperCase(); //❌ Lỗi: Object is of type 'unknown'
if (typeof valueUnknown === "string") {
    valueUnknown.toUpperCase();
}

// luôn luôn dùng unknown thay thế cho any, hết thuốc thì mới dùng any

// const tenbien: kieudulieu = giatri;
const countA: number = 10;
const countB: number | string = "10";

let testC: { name: string, age: number } | { birthday: string } = {
    name: "John Doe",
    age: 20,
};

let testD: { name: string, age: number } & { grade: string } = {
    name: "John Doe",
    age: 20,
    grade: "A",
};

type Student = {
    name: string;
    age?: number;
};

const studentObject: Student = {
    name: "evondev",
};

const e: Record<string, any> = {
    name: "John Doe",
    age: 20,
};
const e1 = {
    name: "John Doe",
    age: 20,
} as Record<string, any>;

const f = {
    name: "John Doe",
    age: 20,
} satisfies Record<string, any>;

console.log(e.birthday);
console.log(e1.birthday);
// console.log(f.birthday); // value mạnh hơn type, lỗi vì value ko chứa birthday
// console.log(studentObject.birthday); //

type UserType = {
    name: string;
    age: number;
};

const g: UserType = {
    name: "John Doe",
    age: 20,
};

const h = {
    name: "John Doe",
    age: 20,
} as UserType;

const i = {
    name: "John Doe",
    age: 20,
} satisfies UserType;



const j = ["John Doe", 20, true] as const;

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST",
}

const k = Role.ADMIN;
console.log(k);

// generic type là khi code mình không biết kiểu dữ liệu lúc chạy mà chỉ biết kiểu dữ liệu lúc compile
// khai báo generic type bằng cách sử dụng từ khóa <T>
// bài toán thực tế:
// khi call api ko biết kết quả trả ra, mà api nào call thì mới biết kết quả của api đấy
// nên là lúc code thì
function fetchData<T>(url: string): Promise<T> {
    return fetch(url).then((response) => response.json());
}

function sum(a: number, b: number): number {
    return a + b;
    // return "";
}

type AcneResponse = {
    name: string;
    age: number;
}
const data = fetchData<AcneResponse>("https://api.example.com/data");


type Aesthentic = {
    x: number;
    y: number;
}
fetchData<Aesthentic>("https://api.example.com/data").then((data) => {
    console.log(data);
});

// synchronous code
// async code -> microtask || macrotask
// microtask: Promise, MutationObserver, process.nextTick
// macrotask: setTimeout, setInterval, setImmediate, requestAnimationFrame
// microtask luôn luôn chạy trước macrotask
console.log("synchronous code 1");
setTimeout(() => {
    console.log("macrotask 1");
}, 0);
Promise.resolve().then(() => {
    console.log("microtask 1");
});
Promise.resolve().then(() => {
    console.log("microtask 2");
});
setTimeout(() => {
    console.log("macrotask 2");
}, 0);
console.log("synchronous code 2");

// A: tính tổng giá tiền -> api lên server -> microtask
// B: chọn món -> api lên server -> microtask
// B import thằng A
// thì báo với ts là t có code tính tổng giá tiền có thể chạy đấy,
// nhưng chạy khi nào thì phải xem code ở file B
// btvn
// Viết lại quản lý học sinh nhưng bằng typescript
// viết automation tạo case trên hệ thống bPro bằng postman
// up ảnh -> chú ý api upload ảnh lên S3 có lấy header response của api trc đó, cần vào network của web để tham khảo
// tạo case