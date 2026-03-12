const API_URL = "http://localhost:5000";

/* ================= LOAD STUDENTS ================= */

async function loadStudents() {

const table = document.getElementById("studentTable");

if(!table) return;

/* Reset table header */

table.innerHTML = `
<tr>
<th>ID</th>
<th>Name</th>
<th>Department</th>
<th>Room</th>
</tr>
`;

try {

const response = await fetch(`${API_URL}/students`);
const students = await response.json();

students.forEach(student => {

let row = table.insertRow();

row.insertCell(0).innerText = student.student_id;
row.insertCell(1).innerText = student.name;
row.insertCell(2).innerText = student.dept;
row.insertCell(3).innerText = student.room_id;

});

} catch (error) {

console.error("Error loading students:", error);

}

}


/* ================= SEARCH STUDENT ================= */

function searchStudent() {

let input = document.getElementById("searchInput");
if(!input) return;

let filter = input.value.toLowerCase();
let table = document.getElementById("studentTable");
let tr = table.getElementsByTagName("tr");

for (let i = 1; i < tr.length; i++) {

let td = tr[i].getElementsByTagName("td")[1];

if (td) {

let textValue = td.textContent || td.innerText;

tr[i].style.display =
textValue.toLowerCase().includes(filter) ? "" : "none";

}

}

}


/* ================= ADD STUDENT ================= */

async function addStudent() {

const name = document.getElementById("name").value;
const dept = document.getElementById("dept").value;
const phone = document.getElementById("phone").value;
const room_id = document.getElementById("room_id").value;
const join_date = document.getElementById("join_date").value;

const student = {
name,
dept,
phone,
room_id,
join_date
};

try {

const response = await fetch(`${API_URL}/students`, {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(student)

});

if(response.ok){

alert("Student Added Successfully");
loadStudents();

}else{

alert("Failed to add student");

}

} catch (error) {

console.error("Error adding student:", error);

}

}


/* ================= AUTO LOAD DATA ================= */

window.onload = loadStudents;