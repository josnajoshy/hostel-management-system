// ===== HOSTEL OS - APP JS =====

// ---- Utilities ----
function showModal(id) {
  document.getElementById(id).classList.add('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
function toast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'error' ? ' error' : '');
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Set date badge
const dateBadge = document.getElementById('dateBadge');
if (dateBadge) {
  dateBadge.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

// ---- DASHBOARD ----
async function renderDashboard() {

  try {

    const studentsRes = await fetch("http://localhost:5000/students");
    const students = await studentsRes.json();

    const roomsRes = await fetch("http://localhost:5000/rooms");
    const rooms = await roomsRes.json();

    const feesRes = await fetch("http://localhost:5000/fees");
    const fees = await feesRes.json();

    const maintRes = await fetch("http://localhost:5000/maintenance");
    const maintenance = await maintRes.json();


    // ===== Stats =====
    document.getElementById('totalStudents').textContent = students.length;

    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    document.getElementById('roomsOccupied').textContent =
      occupiedRooms + "/" + rooms.length;

    const pendingFeeTotal = fees
      .filter(f => f.status === 'Pending')
      .reduce((a, f) => a + f.amount, 0);

    document.getElementById('pendingFees').textContent =
      '₹' + pendingFeeTotal.toLocaleString('en-IN');

    document.getElementById('pendingMaint').textContent =
      maintenance.filter(m => m.status === 'Pending').length;


    // ===== Recent Students =====
    const tbody = document.getElementById('recentStudentsBody');

    if (tbody) {

      const recentStudents = students.slice(-4).reverse();

      tbody.innerHTML = recentStudents.map(s => {

        const feeStatus =
          fees.find(f => f.student_id === s.student_id && f.status === "Pending")
            ? "Pending"
            : "Paid";

        return `
          <tr>
            <td>${s.name}</td>
            <td><span class="badge badge-blue">${s.dept}</span></td>
            <td>${s.room_id}</td>
            <td>
              <span class="badge ${feeStatus === "Paid" ? "badge-green" : "badge-red"}">
                ${feeStatus}
              </span>
            </td>
          </tr>
        `;

      }).join("");

    }


    // ===== Room Grid =====
    const roomGrid = document.getElementById("roomGrid");

    if (roomGrid) {

      roomGrid.innerHTML = rooms.map(r => {

        const cls =
          r.status === "Occupied"
            ? "occupied"
            : r.status === "Maintenance"
            ? "maintenance"
            : "available";

        return `
          <div class="room-cell ${cls}" title="Room ${r.room_id} — ${r.status}">
            ${r.room_id}
          </div>
        `;

      }).join("");

    }


    // ===== Maintenance Alerts =====
    const maintDiv = document.getElementById("maintAlerts");

    if (maintDiv) {

      const pending = maintenance.filter(m => m.status === "Pending");

      if (pending.length === 0) {

        maintDiv.innerHTML =
          '<div class="empty-state"><div class="empty-icon">✓</div>No pending requests</div>';

      } else {

        maintDiv.innerHTML = pending.map(m => `
          <div class="maint-item">
            <div class="maint-dot" style="background:#ffd166"></div>
            <div class="maint-info">
              <div class="maint-room">Room ${m.room_id} · ${m.request_date}</div>
              <div class="maint-issue">${m.issue}</div>
            </div>
            <span class="badge badge-yellow">Pending</span>
          </div>
        `).join("");

      }

    }


    // ===== Fee Overview =====
    const feeDiv = document.getElementById("feeOverview");

    if (feeDiv) {

      const paid = fees.filter(f => f.status === "Paid");
      const pending = fees.filter(f => f.status === "Pending");

      const totalPaid = paid.reduce((a, f) => a + f.amount, 0);
      const totalPending = pending.reduce((a, f) => a + f.amount, 0);

      feeDiv.innerHTML = `
        <div class="fee-row">
          <span class="fee-name">Total Collected</span>
          <span class="fee-amount" style="color:#00d4aa">
            ₹${totalPaid.toLocaleString('en-IN')}
          </span>
        </div>

        <div class="fee-row">
          <span class="fee-name">Pending Amount</span>
          <span class="fee-amount" style="color:#ef476f">
            ₹${totalPending.toLocaleString('en-IN')}
          </span>
        </div>

        <div class="fee-row">
          <span class="fee-name">Total Records</span>
          <span class="fee-amount">${fees.length}</span>
        </div>

        <div class="fee-row">
          <span class="fee-name">Paid Records</span>
          <span class="fee-amount" style="color:#00d4aa">${paid.length}</span>
        </div>

        <div class="fee-row">
          <span class="fee-name">Pending Records</span>
          <span class="fee-amount" style="color:#ffd166">${pending.length}</span>
        </div>
      `;

    }

  } catch (err) {

    console.error(err);
    toast("Failed to load dashboard data", "error");

  }

}
  // Fee overview
  const feeDiv = document.getElementById('feeOverview');
  if (feeDiv) {
    const paid = DB.fees.filter(f => f.status === 'Paid');
    const pending = DB.fees.filter(f => f.status === 'Pending');
    const totalPaid = paid.reduce((a, f) => a + f.amount, 0);
    const totalPending = pending.reduce((a, f) => a + f.amount, 0);
    feeDiv.innerHTML = `
      <div class="fee-row">
        <span class="fee-name">Total Collected</span>
        <span class="fee-amount" style="color:#00d4aa">₹${totalPaid.toLocaleString('en-IN')}</span>
      </div>
      <div class="fee-row">
        <span class="fee-name">Pending Amount</span>
        <span class="fee-amount" style="color:#ef476f">₹${totalPending.toLocaleString('en-IN')}</span>
      </div>
      <div class="fee-row">
        <span class="fee-name">Total Records</span>
        <span class="fee-amount">${DB.fees.length}</span>
      </div>
      <div class="fee-row">
        <span class="fee-name">Paid Records</span>
        <span class="fee-amount" style="color:#00d4aa">${paid.length}</span>
      </div>
      <div class="fee-row">
        <span class="fee-name">Pending Records</span>
        <span class="fee-amount" style="color:#ffd166">${pending.length}</span>
      </div>`;
  }
}

async function addStudentFromDash() {

  const name = document.getElementById('sName').value.trim();
  const dept = document.getElementById('sDept').value.trim();
  const phone = document.getElementById('sPhone').value.trim();
  const roomId = parseInt(document.getElementById('sRoom').value);
  const joinDate = document.getElementById('sJoinDate').value;

  if (!name || !dept || !phone || !roomId || !joinDate) {
    toast('Please fill all fields', 'error');
    return;
  }

  const student = {
    name: name,
    dept: dept,
    phone: phone,
    room_id: roomId,
    join_date: joinDate
  };

  try {

    await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    toast("Student registered successfully!");

  } catch (error) {
    toast("Server error", "error");
  }

  closeModal('addStudentModal');
  renderDashboard();
}
