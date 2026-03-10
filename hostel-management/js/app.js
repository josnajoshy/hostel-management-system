function loadStudents() {

fetch("http://localhost:5000/students")
.then(response => response.json())
.then(students => {

let table = document.getElementById("studentTable");

students.forEach(student => {

let row = table.insertRow();

row.insertCell(0).innerHTML = student.student_id;
row.insertCell(1).innerHTML = student.name;
row.insertCell(2).innerHTML = student.dept;
row.insertCell(3).innerHTML = student.room_id;

});

});

}


function searchStudent() {

let input = document.getElementById("searchInput");
let filter = input.value.toLowerCase();
let table = document.getElementById("studentTable");
let tr = table.getElementsByTagName("tr");

for (let i = 1; i < tr.length; i++) {

let td = tr[i].getElementsByTagName("td")[1];

if (td) {

let textValue = td.textContent || td.innerText;

if (textValue.toLowerCase().indexOf(filter) > -1) {
tr[i].style.display = "";
} else {
tr[i].style.display = "none";
}

}

}

}