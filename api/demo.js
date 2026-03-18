// trong hang -> do da
function b1ChuanBiDuLieu(){
    console.log("b1ChuanBiDuLieu");
    
    function b2CallAPI(){
        console.log("b2CallAPI");
        
        function b3KiemTraKetQua(){
            console.log("b3KiemTraKetQua");
            return "ket qua";
        }
    }
}


// thoi phat minh ra lua

new Promise((resolve, reject)=>{
// hanh dong lam loi hua
}).then((ketQua)=>{
    // thanh cong
    console.log(ketQua);
}).catch((loi)=>{
    // that bai
    console.log(loi);
});

// lam ng, async/await
async function b1ChuanBiDuLieuAsync(){
    // client <--> server -> string
    // client <--> client -> json

    const body = {
        email: "admin@example.com",
        password: "123456"
    };
    // string thanh object json dung JSON.parse
    // const bodyJson = JSON.parse("{\"email\":\"admin@example.com\",\"password\":\"123456\"}");
    // dang byte
    const response = await fetch("https://test-build-quan-ly-kho-production.up.railway.app/api/v1/auth/signin", {
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body), //chuyen object thanh string
        "method": "POST"
      });

      // cho ng doc
    const data = await response.json();
    console.log(data);
}

async function b2CallAPIAsync(){
    console.log("b2CallAPI");
    return "ket qua";
}
async function b3KiemTraKetQuaAsync(){
    console.log("b3KiemTraKetQua");
    return "ket qua";
}

async function main(){
    console.log("main");
    await b1ChuanBiDuLieuAsync();
    console.log("b1ChuanBiDuLieuAsync done");
    await b2CallAPIAsync();
    console.log("b2CallAPIAsync done");
    await b3KiemTraKetQuaAsync();
    console.log("b3KiemTraKetQuaAsync done");
}

main();
