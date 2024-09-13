
// function redirectToDashboard(){
//     window.location.href = "../pages/dashboard.html";
// }

// function resetForm(){
//     document.getElementById("addEmployeeForm").reset();
// }

// function submitForm(){
//     var name = document.getElementById("name").value;
//     var profile_img=document.querySelector('input[name="profile_image"]:checked');
//     var gender=document.querySelector('input[name="gender"]:checked');


//     var department=[];
//     if (document.getElementById("hr").checked) {
//         department.push(document.getElementById("hr").value);
//     }
//     if (document.getElementById("sales").checked) {
//         department.push(document.getElementById("sales").value);
//     }
//     if (document.getElementById("finance").checked) {
//         department.push(document.getElementById("finance").value);
//     }
//     if (document.getElementById("engineer").checked) {
//         department.push(document.getElementById("engineer").value);
//     }
//     if (document.getElementById("others").checked) {
//         department.push(document.getElementById("others").value);
//     }

//     var salary=document.getElementById("salary").value;
//     var day=document.getElementById("day").value;
//     var month=document.getElementById("month").value;
//     var year=document.getElementById("year").value;
//     var date=day+"/"+month+"/"+year;

//     var notes= document.getElementById("notes").value;

// if (name==""|| profile_img=="" || gender=="" ||  salary=="" || date=="" || notes=="") {
//     alert("Please fill all the fields");
//     return;
// }
// if (department.length === 0) {
//     alert("Please select at least one department.");
//     return;
// }
// if (!profile_img || !gender) {
//     alert("Please select both a profile image and a gender.");
//     return;
// }


// var profile_img = profile_img.value;
// var gender = gender.value;


// var employeedata = {
//     name:name,
//     profile_img:profile_img,
//     gender:gender,
//     department:department,
//     salary:salary,
//     date:date,
//     notes:notes
// }
// console.log("Employee data: ",employeedata);
// localStorage.setItem(name, JSON.stringify(employeedata));
// resetForm();
// redirectToDashboard()
// }






// function redirectToDashboard() {
//     window.location = "../pages/dashboard.html";
// }

// function resetForm() {
//     $('#addEmployeeForm').trigger('reset');
// }

// function submitForm() {

//     var name = $('#name').val().trim();

//     var profile_img = $('input[name="profile_image"]:checked').val();
//     var gender = $('input[name="gender"]:checked').val();

//     var department = [];
//     if ($('#hr').is(':checked')) {
//         department.push($('#hr').val());
//     }
//     if ($('#sales').is(':checked')) {
//         department.push($('#sales').val());
//     }
//     if ($('#finance').is(':checked')) {
//         department.push($('#finance').val());
//     }
//     if ($('#engineer').is(':checked')) {
//         department.push($('#engineer').val());
//     }
//     if ($('#others').is(':checked')) {
//         department.push($('#others').val());
//     }

//     var salary = $('#salary').val();
//     var day = $('#day').val();
//     var month = $('#month').val();
//     var year = $('#year').val();
//     var date = day + "/" + month + "/" + year;

//     var notes = $('#notes').val();

//     if (!name || !profile_img || !gender || !salary || !date || !notes) {
//         alert("Please fill all the fields");
//         return;
//     }

//     if (department.length === 0) {
//         alert("Please select at least one department.");
//         return;
//     }

//     var employeedata = {
//         name: name,
//         profile_img: profile_img,
//         gender: gender,
//         department: department,
//         salary: salary,
//         date: date,
//         notes: notes
//     }

//     console.log("Employee data: ", employeedata);

//     $.ajax({
//         url: "http://localhost:3000/user", 
//         method: "POST",
//         data: JSON.stringify(employeedata), 
//         contentType: "application/json",   
//         success: function(response) {
//             console.log("User added successfully:", response);
//             alert("User added successfully!");
           
//             displayTable();
//             resetForm();
//         },
//         error: function(err) {
//             console.error("Error adding user", err);
//             alert("Error adding user, please try again.");
//         }
//     });

//     resetForm();
//     redirectToDashboard();
// }



$(document).ready(function() {
    let editingUserId = null;

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        console.log("11111111111111111111111111111111111")
        console.log("Editing user with ID:", userId);

        $.ajax({
            url: `http://localhost:3000/user/`+userId,
            method: "GET",
            success: function(user) {
                editingUserId = user.id;
                console.log("Fetched user data for editing:", user);

                $('#name').val(user.name);
                $('input[name="profile_image"][value="' + user.profile_img + '"]').prop('checked', true);
                $('input[name="gender"][value="' + user.gender + '"]').prop('checked', true);

                user.department.forEach(dept => {
                    $('#' + dept.toLowerCase()).prop('checked', true);
                });

                $('#salary').val(user.salary);
                const [day, month, year] = user.date.split('/');
                $('#day').val(day);
                $('#month').val(month);
                $('#year').val(year);
                $('#notes').val(user.notes);
console.log("2222222222222222222222222222")
console.log("Editing user with ID:", editingUserId);
                // Attach the submit handler for editing user
                $('#submitBtn').off('click').on('click', function(event) {
                    event.preventDefault();
                    console.log("3333333333333333333333333")
console.log("Editing user with ID:", editingUserId);
                    console.log("Submit clicked for editing User ID:", editingUserId);
                    submitForm(editingUserId); // Call submitForm with userId
                    redirectToDashboard();
                });
            },
            error: function(err) {
                console.error("Error fetching user data for editing:", err);
            }
        });
    } else {
        // No userId means adding a new user
        $('#submitBtn').off('click').on('click', function(event) {
            console.log('44444444444444444444444444444444444444')
            event.preventDefault();
            console.log("Submit clicked for adding new user.");
            submitForm(); // Call submitForm without userId
            redirectToDashboard();
        });
    }
});

function submitForm(userId) {
    console.log("Submit form called with User ID:", userId);

    var name = $('#name').val().trim();
    var profile_img = $('input[name="profile_image"]:checked').val();
    var gender = $('input[name="gender"]:checked').val();

    var department = [];
    $('input[name="department"]:checked').each(function() {
        department.push($(this).val());
    });

    var salary = $('#salary').val();
    var day = $('#day').val();
    var month = $('#month').val();
    var year = $('#year').val();
    var date = day + "/" + month + "/" + year;
    var notes = $('#notes').val();

    var employeeData = {
        name: name,
        profile_img: profile_img,
        gender: gender,
        department: department,
        salary: salary,
        date: date,
        notes: notes
    };

    console.log("Employee data to be submitted:", employeeData);

    if (userId) {
        // Update existing user
        $.ajax({
            url: `http://localhost:3000/user/${userId}`,
            method: "PUT",
            data: JSON.stringify(employeeData),
            contentType: "application/json",
            success: function(response) {
                console.log("User updated successfully:", response);
                alert("User updated successfully!");
                redirectToDashboard();
            },
            error: function(err) {
                console.error("Error updating user:", err);
                alert("Error updating user, please try again.");
            }
        });
    } else {
        // Add new user
        $.ajax({
            url: "http://localhost:3000/user",
            method: "POST",
            data: JSON.stringify(employeeData),
            contentType: "application/json",
            success: function(response) {
                console.log("User added successfully:", response);
                alert("User added successfully!");
                redirectToDashboard();
            },
            error: function(err) {
                console.error("Error adding user:", err);
                alert("Error adding user, please try again.");
            }
        });
    }
}

function redirectToDashboard() {
    window.location = "../pages/dashboard.html"; // Adjust the path if needed
}


function resetForm() {
    $('#addEmployeeForm').trigger('reset');
}


