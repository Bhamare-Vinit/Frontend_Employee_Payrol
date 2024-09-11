

function redirectToDashboard(){
    window.location.href = "../pages/dashboard.html";
}

function resetForm(){
    document.getElementById("addEmployeeForm").reset();
}

function submitForm(){
    var name = document.getElementById("name").value;
    var profile_img=document.querySelector('input[name="profile_image"]:checked');
    var gender=document.querySelector('input[name="gender"]:checked');


    var department=[];
    if (document.getElementById("hr").checked) {
        department.push(document.getElementById("hr").value);
    }
    if (document.getElementById("sales").checked) {
        department.push(document.getElementById("sales").value);
    }
    if (document.getElementById("finance").checked) {
        department.push(document.getElementById("finance").value);
    }
    if (document.getElementById("engineer").checked) {
        department.push(document.getElementById("engineer").value);
    }
    if (document.getElementById("others").checked) {
        department.push(document.getElementById("others").value);
    }

    var salary=document.getElementById("salary").value;
    var day=document.getElementById("day").value;
    var month=document.getElementById("month").value;
    var year=document.getElementById("year").value;
    var date=day+"/"+month+"/"+year;

    var notes= document.getElementById("notes").value;

if (name==""|| profile_img=="" || gender=="" ||  salary=="" || date=="" || notes=="") {
    alert("Please fill all the fields");
    return;
}
if (department.length === 0) {
    alert("Please select at least one department.");
    return;
}
if (!profile_img || !gender) {
    alert("Please select both a profile image and a gender.");
    return;
}


var profile_img = profile_img.value;
var gender = gender.value;


var employeedata = {
    name:name,
    profile_img:profile_img,
    gender:gender,
    department:department,
    salary:salary,
    date:date,
    notes:notes
}
console.log("Employee data: ",employeedata);
localStorage.setItem(name, JSON.stringify(employeedata));
resetForm();
redirectToDashboard()


    

}