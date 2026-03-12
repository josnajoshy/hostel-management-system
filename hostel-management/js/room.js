const API_URL = "http://localhost:5000";

async function loadRooms() {

const table = document.getElementById("roomTable");

if (!table) return;

/* Reset table header */

table.innerHTML = `
<tr>
<th>Room ID</th>
<th>Type</th>
<th>Capacity</th>
<th>Occupied</th>
<th>Rent</th>
<th>Status</th>
</tr>
`;

try {

const response = await fetch(`${API_URL}/rooms`);
const rooms = await response.json();

/* Insert rows */

rooms.forEach(room => {

let row = table.insertRow();

row.insertCell(0).innerText = room.room_id;
row.insertCell(1).innerText = room.type;
row.insertCell(2).innerText = room.capacity;
row.insertCell(3).innerText = room.occupied;
row.insertCell(4).innerText = room.rent;

/* Calculate room status */

let status = room.occupied >= room.capacity ? "Full" : "Available";

row.insertCell(5).innerText = status;

});

} catch (error) {

console.error("Error loading rooms:", error);

}

}

/* Run when page loads */

window.onload = loadRooms;