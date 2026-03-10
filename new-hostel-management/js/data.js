const students = [
    { id: 101, name: "Rahul", department: "CSE", room: 204 },
    { id: 102, name: "Arjun", department: "ECE", room: 105 },
    { id: 103, name: "Vikram", department: "ME", room: 210 },
    { id: 104, name: "Sanjay", department: "CSE", room: 111 },
    { id: 105, name: "Kiran", department: "EEE", room: 305 }
];

const rooms = [
    { number: 101, block: "A", capacity: 3, occupied: 2, status: "Available" },
    { number: 102, block: "A", capacity: 3, occupied: 3, status: "Full" },
    { number: 201, block: "B", capacity: 2, occupied: 1, status: "Available" }
];

const maintenanceRequests = [
    { id: 1, room: 101, issue: "Fan not working", date: "10-03-2026", status: "Pending" },
    { id: 2, room: 204, issue: "Water leakage", date: "09-03-2026", status: "In Progress" },
    { id: 3, room: 110, issue: "Light not working", date: "08-03-2026", status: "Completed" }
];

const visitors = [
    { name: "Rajesh", student: "Rahul", room: 204, date: "10-03-2026", timeIn: "5:00 PM", timeOut: "7:00 PM" },
    { name: "Suresh", student: "Arjun", room: 105, date: "09-03-2026", timeIn: "4:30 PM", timeOut: "6:00 PM" }
];

const fees = [
    { studentId: 101, name: "Rahul", amount: 5000, status: "Paid", paymentDate: "01-03-2026" },
    { studentId: 102, name: "Arjun", amount: 5000, status: "Pending", paymentDate: "-" }
];