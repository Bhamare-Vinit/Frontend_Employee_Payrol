

// function redirectToAddUser(){
//     window.location.href = "../pages/add_user.html";
// }


// function displayTable(){

//     const keys=Object.keys(localStorage);

//     const container = document.getElementById("tableContainer");
//     container.innerHTML = "";

//     keys.forEach((key) => {
//         const employeedata = JSON.parse(localStorage.getItem(key));

//         const row = document.createElement("tr");
//         row.className="row";
//         row.style="background-color: white; color: black; text-align: center"


//         row.innerHTML=`<td
//                 style="
//                   padding: 20px;
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                 "
//               >
//                 <img
//                   src="../assets/Om.jpeg"
//                   style="border-radius: 50%; width: 40px; height: 40px"
//                   alt="profile"
//                 />
//                 ${employeedata.name}
//               </td>
//               <td>${employeedata.gender}</td>
//               <td>
//                 <span
//                   style="
//                     background-color: #e7ffe7;
//                     padding: 5px;
//                     border-radius: 5px;
//                   "
//                   >${employeedata.department[0]}</span
//                 >
//                 <span
//                   style="
//                     background-color: #e7ffe7;
//                     padding: 5px;
//                     border-radius: 5px;
//                   "
//                   >${employeedata.department[1]}</span
//                 >
//                 <span
//                   style="
//                     background-color: #e7ffe7;
//                     padding: 5px;
//                     border-radius: 5px;
//                   "
//                   >${employeedata.department[2]}</span
//                 >
//               </td>
//               <td>${employeedata.salary}</td>
//               <td>${employeedata.date}</td>
//               <td
//                 style="
//                   /* font-size: 25px;
//                 display: flex;
//                 justify-content: space-evenly;
//                 align-content: center;
//                 border: 1px solid black; */
//                 "
//               >
//                 <i class="fa-solid fa-trash"></i>
//                 <i class="fa-solid fa-pen"></i>
//               </td>`
//         container.appendChild(row);
//     })

    

//     console.log(keys);

// }
// window.onload=displayTable;

function redirectToAddUser() {

    window.location = "../pages/add_user.html";
}

// function displayTable() {
//     const keys = Object.keys(localStorage);

//     const container = $('#tableContainer');
//     container.html(''); 

//     keys.forEach((key) => {
//         const employeedata = JSON.parse(localStorage.getItem(key));

//         const row = $('<tr></tr>').addClass('row').css({
//             'background-color': 'white',
//             'color': 'black',
//             'text-align': 'center'
//         });

//         row.html(`
//             <td style="padding: 20px; display: flex; align-items: center; justify-content: center;">
//                 <img src="../assets/Om.jpeg" style="border-radius: 50%; width: 40px; height: 40px" alt="profile" />
//                 ${employeedata.name}
//             </td>
//             <td>${employeedata.gender}</td>
//             <td class="departments"></td>
//             <td>${employeedata.salary}</td>
//             <td>${employeedata.date}</td>
//             <td>
//                 <i class="fa-solid fa-trash"></i>
//                 <i class="fa-solid fa-pen"></i>
//             </td>
//         `);

//         const departmentsContainer = row.find('.departments');
//         employeedata.department.forEach(department => {
//             if (department) {
//                 const departmentSpan = $('<span></span>').css({
//                     'background-color': '#e7ffe7',
//                     'padding': '5px',
//                     'border-radius': '5px',
//                     'margin': '0 5px'
//                 }).text(department);
//                 departmentsContainer.append(departmentSpan);
//             }
//         });

//         container.append(row); 
//     });

//     console.log(keys);
//     makeRequest('http://localhost:3000/user','GET',{})

    
// }


function displayTable() {
    const container = $("#tableContainer");
    container.html("");
    $.ajax({
        url: "http://localhost:3000/user",  
        method: "GET",
        success: function(data) {
            data.forEach(function(user) {
                const row = `<tr class="row" style="background-color: white; color: black; text-align: center">
                    <td style="padding: 20px; display: flex; align-items: center; justify-content: center">
                        <img src="../assets/Om.jpeg" style="border-radius: 50%; width: 40px; height: 40px" alt="profile" />
                        ${user.name}
                    </td>
                    <td>${user.gender}</td>
                    <td>${user.department.map(dept => `<span style="background-color: #e7ffe7; padding: 5px; border-radius: 5px;margin: 0 5px">${dept}</span>`).join('')}</td>
                    <td>${user.salary}</td>
                    <td>${user.date}</td>
                    <td style="display : flex; justify-content: space-evenly">
                        <i class="fa-solid fa-trash" onclick="deleteUser('${user.id}')" style="cursor:pointer;"></i>
                        <i class="fa-solid fa-pen" onclick="editUser('${user.id}')" style="cursor:pointer;"></i>
                    </td>
                </tr>`;
                console.log(typeof user)
                console.log(user)
                container.append(row);
                
                // 
            });
        },
        error: function(err) {
            console.error("Error fetching data", err);
        }
    });
}

$(document).ready(displayTable);



function makeRequest(url, requestType, data) {
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 ){
            console.log(JSON.parse(xhr.response))
        }
    }
    xhr.open(requestType,url,true)
    xhr.send()
}

function deleteUser(userId) {
console.log("id",userId)
    
    $.ajax({
        url: `http://localhost:3000/user/`+userId,  
        method: "DELETE",
        success: function() {
            console.log("User deleted successfully");
            displayTable();  
        },
        error: function(err) {
            console.error("Error deleting user", err);
        }
    });
}

function editUser(userId) {
    console.log("im in userid",userId)
    $.ajax({
        url: `http://localhost:3000/user/${userId}`,
        method: "GET",
        success: function(user) {
            $("#name").val(user.name);
            $("#gender").val(user.gender);
            $("#department").val(user.department.join(", "));  
            $("#salary").val(user.salary);
            $("#date").val(user.date);
            
            $("#editUserForm").submit(function(event) {
                event.preventDefault();
                
                const updatedData = {
                    name: $("#name").val(),
                    gender: $("#gender").val(),
                    department: [$("#department").val()],
                    salary: $("#salary").val(),
                    date: $("#date").val()
                };
                
                updateUser(userId, updatedData);
            });
        },
        error: function(err) {
            console.error("Error fetching user data", err);
        }
    });
}

function updateUser(userId, updatedData) {
    $.ajax({
        url: `http://localhost:3000/user/${userId}`,
        method: "PUT",
        data: JSON.stringify(updatedData),
        contentType: "application/json",
        success: function(response) {
            console.log("User updated successfully:", response);
            displayTable();  
        },
        error: function(err) {
            console.error("Error updating user", err);
        }
    });
}
