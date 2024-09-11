

function redirectToAddUser(){
    window.location.href = "../pages/add_user.html";
}

let newObject = localStorage.getItem("vinit");
console.log(JSON.parse(newObject));
let newObject1 = localStorage.getItem("new");
console.log(JSON.parse(newObject1));
let newObject2 = localStorage.getItem("ram");
console.log(JSON.parse(newObject2));

function displayTable(){

    const keys=Object.keys(localStorage);

    const container = document.getElementById("tableContainer");
    container.innerHTML = "";

    keys.forEach((key) => {
        const employeedata = JSON.parse(localStorage.getItem(key));

        const row = document.createElement("tr");
        row.className="row";
        row.style="background-color: white; color: black; text-align: center"


        row.innerHTML=`<td
                style="
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <img
                  src="../assets/Om.jpeg"
                  style="border-radius: 50%; width: 40px; height: 40px"
                  alt="profile"
                />
                ${employeedata.name}
              </td>
              <td>${employeedata.gender}</td>
              <td>
                <span
                  style="
                    background-color: #e7ffe7;
                    padding: 5px;
                    border-radius: 5px;
                  "
                  >${employeedata.department[0]}</span
                >
                <span
                  style="
                    background-color: #e7ffe7;
                    padding: 5px;
                    border-radius: 5px;
                  "
                  >${employeedata.department[1]}</span
                >
                <span
                  style="
                    background-color: #e7ffe7;
                    padding: 5px;
                    border-radius: 5px;
                  "
                  >${employeedata.department[2]}</span
                >
              </td>
              <td>${employeedata.salary}</td>
              <td>${employeedata.date}</td>
              <td
                style="
                  /* font-size: 25px;
                display: flex;
                justify-content: space-evenly;
                align-content: center;
                border: 1px solid black; */
                "
              >
                <i class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-pen"></i>
              </td>`
        container.appendChild(row);
    })

    

    console.log(keys);

}
window.onload=displayTable;