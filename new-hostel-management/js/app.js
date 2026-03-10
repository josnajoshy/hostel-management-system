let editingStudentIndex = -1; // -1 when adding new, otherwise holds index to update

function renderStudents() {
    const table = document.getElementById("studentTable");
    // reset table contents but keep header row
    table.innerHTML = `
<tr>
<th>ID</th>
<th>Name</th>
<th>Department</th>
<th>Room</th>
<th>Actions</th>
</tr>`;

    students.forEach((student, idx) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = student.id;
        row.insertCell(1).innerHTML = student.name;
        row.insertCell(2).innerHTML = student.department;
        row.insertCell(3).innerHTML = student.room;
        const actionCell = row.insertCell(4);
        actionCell.innerHTML = `
            <button class="action-btn" onclick="editStudent(${idx})">✏️</button>
            <button class="action-btn" onclick="deleteStudent(${idx})">🗑️</button>
        `;
    });
}

function editStudent(idx) {
    const s = students[idx];
    document.getElementById("newId").value = s.id;
    document.getElementById("newName").value = s.name;
    document.getElementById("newDept").value = s.department;
    document.getElementById("newRoom").value = s.room;
    editingStudentIndex = idx;
    document.querySelector("#studentForm button").textContent = "Update";
}

function deleteStudent(idx) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(idx, 1);
        renderStudents();
    }
}


function addStudent() {
    const id = parseInt(document.getElementById("newId").value);
    const name = document.getElementById("newName").value.trim();
    const department = document.getElementById("newDept").value.trim();
    const room = parseInt(document.getElementById("newRoom").value);

    if (!id || !name || !department || !room) {
        alert("Please fill out all fields.");
        return;
    }

    // if editing, update existing entry
    if (editingStudentIndex >= 0) {
        students[editingStudentIndex] = { id, name, department, room };
        editingStudentIndex = -1;
        document.querySelector("#studentForm button").textContent = "Add";
    } else {
        // prevent duplicate IDs when adding
        if (students.some(s => s.id === id)) {
            alert("A student with that ID already exists.");
            return;
        }
        students.push({ id, name, department, room });
    }

    renderStudents();
    document.getElementById("studentForm").reset();
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
            tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// ----------- ROOM MANAGEMENT --------------
let editingRoomIndex = -1;

function renderRooms() {
    const table = document.getElementById("roomTable");
    table.innerHTML = `
<tr>
<th>Room Number</th>
<th>Block</th>
<th>Capacity</th>
<th>Occupied</th>
<th>Status</th>
<th>Actions</th>
</tr>`;
    rooms.forEach((room, idx) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = room.number;
        row.insertCell(1).innerHTML = room.block;
        row.insertCell(2).innerHTML = room.capacity;
        row.insertCell(3).innerHTML = room.occupied;
        row.insertCell(4).innerHTML = room.status;
        const actions = row.insertCell(5);
        actions.innerHTML = `<button class="action-btn" onclick="editRoom(${idx})">✏️</button> <button class="action-btn" onclick="deleteRoom(${idx})">🗑️</button>`;
    });
}

function addRoom() {
    const number = parseInt(document.getElementById("roomNumber").value);
    const block = document.getElementById("roomBlock").value.trim();
    const capacity = parseInt(document.getElementById("roomCapacity").value);
    const occupied = parseInt(document.getElementById("roomOccupied").value);
    const status = document.getElementById("roomStatus").value;

    if (!number || !block || !capacity || isNaN(occupied) || !status) {
        alert("Please fill out all fields.");
        return;
    }

    if (editingRoomIndex >= 0) {
        rooms[editingRoomIndex] = { number, block, capacity, occupied, status };
        editingRoomIndex = -1;
        document.querySelector("#roomForm button").textContent = "Add";
    } else {
        rooms.push({ number, block, capacity, occupied, status });
    }

    renderRooms();
    document.getElementById("roomForm").reset();
}

function editRoom(idx) {
    const r = rooms[idx];
    document.getElementById("roomNumber").value = r.number;
    document.getElementById("roomBlock").value = r.block;
    document.getElementById("roomCapacity").value = r.capacity;
    document.getElementById("roomOccupied").value = r.occupied;
    document.getElementById("roomStatus").value = r.status;
    editingRoomIndex = idx;
    document.querySelector("#roomForm button").textContent = "Update";
}

function deleteRoom(idx) {
    if (confirm("Delete this room?")) {
        rooms.splice(idx, 1);
        renderRooms();
    }
}

function searchRoom() {
    let input = document.getElementById("roomSearch");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("roomTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// ----------- MAINTENANCE --------------
let editingMaintIndex = -1;

function renderMaintenance() {
    const table = document.getElementById("maintTable");
    table.innerHTML = `
<tr>
<th>Request ID</th>
<th>Room</th>
<th>Issue</th>
<th>Date</th>
<th>Status</th>
<th>Actions</th>
</tr>`;
    maintenanceRequests.forEach((req, idx) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = req.id;
        row.insertCell(1).innerHTML = req.room;
        row.insertCell(2).innerHTML = req.issue;
        row.insertCell(3).innerHTML = req.date;
        row.insertCell(4).innerHTML = req.status;
        const act = row.insertCell(5);
        act.innerHTML = `<button class="action-btn" onclick="editMaint(${idx})">✏️</button> <button class="action-btn" onclick="deleteMaint(${idx})">🗑️</button>`;
    });
}

function addMaint() {
    const id = parseInt(document.getElementById("maintId").value);
    const room = parseInt(document.getElementById("maintRoom").value);
    const issue = document.getElementById("maintIssue").value.trim();
    const date = document.getElementById("maintDate").value;
    const status = document.getElementById("maintStatus").value;
    if (!id || !room || !issue || !date || !status) {
        alert("Please fill out all fields.");
        return;
    }
    if (editingMaintIndex >= 0) {
        maintenanceRequests[editingMaintIndex] = { id, room, issue, date, status };
        editingMaintIndex = -1;
        document.querySelector("#maintForm button").textContent = "Add";
    } else {
        maintenanceRequests.push({ id, room, issue, date, status });
    }
    renderMaintenance();
    document.getElementById("maintForm").reset();
}

function editMaint(idx) {
    const r = maintenanceRequests[idx];
    document.getElementById("maintId").value = r.id;
    document.getElementById("maintRoom").value = r.room;
    document.getElementById("maintIssue").value = r.issue;
    document.getElementById("maintDate").value = r.date;
    document.getElementById("maintStatus").value = r.status;
    editingMaintIndex = idx;
    document.querySelector("#maintForm button").textContent = "Update";
}

function deleteMaint(idx) {
    if (confirm("Delete this request?")) {
        maintenanceRequests.splice(idx, 1);
        renderMaintenance();
    }
}

function searchMaint() {
    let input = document.getElementById("maintSearch");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("maintTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// ----------- VISITORS --------------
let editingVisitorIndex = -1;

function renderVisitors() {
    const table = document.getElementById("visitorTable");
    table.innerHTML = `
<tr>
<th>Visitor Name</th>
<th>Student</th>
<th>Room</th>
<th>Date</th>
<th>Time In</th>
<th>Time Out</th>
<th>Actions</th>
</tr>`;
    visitors.forEach((v, idx) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = v.name;
        row.insertCell(1).innerHTML = v.student;
        row.insertCell(2).innerHTML = v.room;
        row.insertCell(3).innerHTML = v.date;
        row.insertCell(4).innerHTML = v.timeIn;
        row.insertCell(5).innerHTML = v.timeOut;
        const act = row.insertCell(6);
        act.innerHTML = `<button class="action-btn" onclick="editVisitor(${idx})">✏️</button> <button class="action-btn" onclick="deleteVisitor(${idx})">🗑️</button>`;
    });
}

function addVisitor() {
    const name = document.getElementById("visName").value.trim();
    const student = document.getElementById("visStudent").value.trim();
    const room = parseInt(document.getElementById("visRoom").value);
    const date = document.getElementById("visDate").value;
    const timeIn = document.getElementById("visIn").value;
    const timeOut = document.getElementById("visOut").value;
    if (!name || !student || !room || !date || !timeIn || !timeOut) {
        alert("Please fill out all fields.");
        return;
    }
    if (editingVisitorIndex >= 0) {
        visitors[editingVisitorIndex] = { name, student, room, date, timeIn, timeOut };
        editingVisitorIndex = -1;
        document.querySelector("#visitorForm button").textContent = "Add";
    } else {
        visitors.push({ name, student, room, date, timeIn, timeOut });
    }
    renderVisitors();
    document.getElementById("visitorForm").reset();
}

function editVisitor(idx) {
    const v = visitors[idx];
    document.getElementById("visName").value = v.name;
    document.getElementById("visStudent").value = v.student;
    document.getElementById("visRoom").value = v.room;
    document.getElementById("visDate").value = v.date;
    document.getElementById("visIn").value = v.timeIn;
    document.getElementById("visOut").value = v.timeOut;
    editingVisitorIndex = idx;
    document.querySelector("#visitorForm button").textContent = "Update";
}

function deleteVisitor(idx) {
    if (confirm("Delete this visitor record?")) {
        visitors.splice(idx, 1);
        renderVisitors();
    }
}

function searchVisitor() {
    let input = document.getElementById("visitorSearch");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("visitorTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// ----------- FEES --------------
let editingFeeIndex = -1;

function renderFees() {
    const table = document.getElementById("feeTable");
    table.innerHTML = `
<tr>
<th>Student ID</th>
<th>Name</th>
<th>Amount</th>
<th>Status</th>
<th>Payment Date</th>
<th>Actions</th>
</tr>`;
    fees.forEach((f, idx) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = f.studentId;
        row.insertCell(1).innerHTML = f.name;
        row.insertCell(2).innerHTML = `₹${f.amount}`;
        row.insertCell(3).innerHTML = `<span class="status-${f.status.toLowerCase()}">${f.status}</span>`;
        row.insertCell(4).innerHTML = f.paymentDate;
        const act = row.insertCell(5);
        act.innerHTML = `<button class="action-btn" onclick="editFee(${idx})">✏️</button> <button class="action-btn" onclick="deleteFee(${idx})">🗑️</button>`;
    });
}

function addFee() {
    const studentId = parseInt(document.getElementById("feeStudentId").value);
    const name = document.getElementById("feeName").value.trim();
    const amount = parseFloat(document.getElementById("feeAmount").value);
    const status = document.getElementById("feeStatus").value;
    const paymentDate = document.getElementById("feeDate").value || "-";
    if (!studentId || !name || isNaN(amount) || !status) {
        alert("Please fill out all required fields.");
        return;
    }
    if (editingFeeIndex >= 0) {
        fees[editingFeeIndex] = { studentId, name, amount, status, paymentDate };
        editingFeeIndex = -1;
        document.querySelector("#feeForm button").textContent = "Add";
    } else {
        fees.push({ studentId, name, amount, status, paymentDate });
    }
    renderFees();
    document.getElementById("feeForm").reset();
}

function editFee(idx) {
    const f = fees[idx];
    document.getElementById("feeStudentId").value = f.studentId;
    document.getElementById("feeName").value = f.name;
    document.getElementById("feeAmount").value = f.amount;
    document.getElementById("feeStatus").value = f.status;
    document.getElementById("feeDate").value = f.paymentDate === "-" ? "" : f.paymentDate;
    editingFeeIndex = idx;
    document.querySelector("#feeForm button").textContent = "Update";
}

function deleteFee(idx) {
    if (confirm("Delete this fee record?")) {
        fees.splice(idx, 1);
        renderFees();
    }
}

function searchFee() {
    let input = document.getElementById("feeSearch");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("feeTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}