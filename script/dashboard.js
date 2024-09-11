

function redirectToAddUser(){
    window.location.href = "../pages/add_user.html";
}

let newObject = localStorage.getItem("vinit");
console.log(JSON.parse(newObject));