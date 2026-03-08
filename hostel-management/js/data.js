// ===== HOSTEL OS - DATA STORE =====
// Simulated in-memory + localStorage data store

const DB = {
  students: JSON.parse(localStorage.getItem('hms_students') || 'null') || [
    { id: 1, name: 'Anu Sharma', dept: 'CSE', phone: '9876543210', roomId: 101, joinDate: '2025-01-10' },
    { id: 2, name: 'Rahul Verma', dept: 'ECE', phone: '9812345678', roomId: 102, joinDate: '2025-01-15' },
    { id: 3, name: 'Priya Singh', dept: 'MECH', phone: '9898989898', roomId: 101, joinDate: '2025-02-01' },
    { id: 4, name: 'Arjun Patel', dept: 'CIVIL', phone: '9765432100', roomId: 103, joinDate: '2025-02-10' },
    { id: 5, name: 'Sneha Roy', dept: 'CSE', phone: '9654321000', roomId: 104, joinDate: '2025-03-01' },
  ],
  rooms: JSON.parse(localStorage.getItem('hms_rooms') || 'null') || [
    { id: 101, type: 'Single', capacity: 1, rent: 3000, status: 'Occupied' },
    { id: 102, type: 'Double', capacity: 2, rent: 2000, status: 'Occupied' },
    { id: 103, type: 'Triple', capacity: 3, rent: 1500, status: 'Occupied' },
    { id: 104, type: 'Single', capacity: 1, rent: 3500, status: 'Occupied' },
    { id: 105, type: 'Double', capacity: 2, rent: 2500, status: 'Available' },
    { id: 106, type: 'Single', capacity: 1, rent: 3000, status: 'Available' },
    { id: 107, type: 'Double', capacity: 2, rent: 2000, status: 'Maintenance' },
    { id: 108, type: 'Triple', capacity: 3, rent: 1500, status: 'Available' },
    { id: 109, type: 'Single', capacity: 1, rent: 3200, status: 'Available' },
    { id: 110, type: 'Double', capacity: 2, rent: 2000, status: 'Available' },
  ],
  fees: JSON.parse(localStorage.getItem('hms_fees') || 'null') || [
    { id: 801, studentId: 1, amount: 5000, paymentDate: '2025-08-01', status: 'Paid' },
    { id: 802, studentId: 2, amount: 4000, paymentDate: '2025-08-05', status: 'Pending' },
    { id: 803, studentId: 3, amount: 5000, paymentDate: '2025-08-10', status: 'Paid' },
    { id: 804, studentId: 4, amount: 3000, paymentDate: '2025-08-12', status: 'Pending' },
    { id: 805, studentId: 5, amount: 3500, paymentDate: '2025-09-01', status: 'Paid' },
  ],
  maintenance: JSON.parse(localStorage.getItem('hms_maintenance') || 'null') || [
    { id: 301, roomId: 107, issue: 'Fan not working', requestDate: '2025-08-02', status: 'Pending' },
    { id: 302, roomId: 102, issue: 'Leaking tap', requestDate: '2025-08-05', status: 'Completed' },
    { id: 303, roomId: 105, issue: 'Broken window', requestDate: '2025-08-10', status: 'Pending' },
  ],
  visitors: JSON.parse(localStorage.getItem('hms_visitors') || 'null') || [
    { id: 1, visitorName: 'Ravi Sharma', studentId: 1, visitDate: '2025-08-10', relation: 'Father' },
    { id: 2, visitorName: 'Meena Verma', studentId: 2, visitDate: '2025-08-12', relation: 'Mother' },
    { id: 3, visitorName: 'Suresh Patel', studentId: 4, visitDate: '2025-08-15', relation: 'Guardian' },
  ],

  save() {
    localStorage.setItem('hms_students', JSON.stringify(this.students));
    localStorage.setItem('hms_rooms', JSON.stringify(this.rooms));
    localStorage.setItem('hms_fees', JSON.stringify(this.fees));
    localStorage.setItem('hms_maintenance', JSON.stringify(this.maintenance));
    localStorage.setItem('hms_visitors', JSON.stringify(this.visitors));
  },

  nextId(arr) {
    return arr.length > 0 ? Math.max(...arr.map(x => x.id)) + 1 : 1;
  },

  getStudentName(id) {
    const s = this.students.find(s => s.id === id);
    return s ? s.name : 'Unknown';
  }
};
