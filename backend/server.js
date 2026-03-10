require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

/* ========================
   MIDDLEWARE
======================== */

app.use(cors());
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "../hostel-management")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../hostel-management/index.html"));
});


/* ========================
   STUDENTS API
======================== */

// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Add student
app.post("/addStudent",(req,res)=>{

const {name,dept,phone,room_id} = req.body;

const sql = "INSERT INTO students (name,dept,phone,room_id,join_date) VALUES (?,?,?,?,CURDATE())";

db.query(sql,[name,dept,phone,room_id],(err,result)=>{

if(err){
console.log(err);
res.send(err);
}
else{
res.json({message:"Student Added"});
}

});

});
// Delete student
app.delete("/students/:id", (req, res) => {

  const id = req.params.id;

  db.query("DELETE FROM students WHERE student_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json({ message: "Student Deleted" });
    }
  });

});


/* ========================
   ROOMS API
======================== */

app.get("/rooms", (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});


/* ========================
   FEES API
======================== */

app.get("/fees", (req, res) => {
  db.query("SELECT * FROM fees", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/fees", (req, res) => {

  const { student_id, amount, payment_date, status } = req.body;

  const sql = `
  INSERT INTO fees (student_id, amount, payment_date, status)
  VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [student_id, amount, payment_date, status], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json({ message: "Fee Record Added" });
    }
  });

});


/* ========================
   MAINTENANCE API
======================== */

app.get("/maintenance",(req,res)=>{

const sql = "SELECT * FROM maintenance";

db.query(sql,(err,result)=>{

if(err){
console.log(err);
res.status(500).json(err);
}
else{
res.json(result);
}

});

});

app.post("/addMaintenance",(req,res)=>{

const {room_id,issue,status} = req.body;

const sql = "INSERT INTO maintenance (room_id,issue,request_date,status) VALUES (?,?,CURDATE(),?)";

db.query(sql,[room_id,issue,status],(err,result)=>{

if(err){
console.log(err);
res.status(500).json(err);
}
else{
res.json({message:"Maintenance Request Added"});
}

});

});

/* ========================
   VISITORS API
======================== */

app.get("/visitors", (req, res) => {
  db.query("SELECT * FROM visitors", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/visitors", (req, res) => {

  const { visitor_name, student_id, visit_date, relation } = req.body;

  const sql = `
  INSERT INTO visitors (visitor_name, student_id, visit_date, relation)
  VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [visitor_name, student_id, visit_date, relation], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json({ message: "Visitor Added" });
    }
  });

});


/* ========================
   SERVER
======================== */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});