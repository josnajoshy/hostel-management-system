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
app.post("/students",(req,res)=>{

const {name,dept,phone,room_id} = req.body;

const insertStudent = `
INSERT INTO students (name,dept,phone,room_id,join_date)
VALUES (?,?,?,?,CURDATE())
`;

db.query(insertStudent,[name,dept,phone,room_id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).send(err);
}

/* update room occupancy */

const updateRoom = `
UPDATE rooms
SET occupied = occupied + 1
WHERE room_id = ?
`;

db.query(updateRoom,[room_id],(err)=>{
if(err) console.log(err);
});

/* update room status */

const updateStatus = `
UPDATE rooms
SET status =
CASE
WHEN occupied >= capacity THEN 'Full'
ELSE 'Available'
END
WHERE room_id = ?
`;

db.query(updateStatus,[room_id],(err)=>{
if(err) console.log(err);
});

res.json({message:"Student Added Successfully"});

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
} 
else {
res.json(result);
}

});

});



/* ========================
   FEES API
======================== */

app.get("/fees", (req, res) => {

const sql = `
SELECT 
students.student_id,
students.name AS student_name,
fees.fee_id,
fees.amount,
fees.payment_date,
COALESCE(fees.status,'Pending') AS status
FROM students
LEFT JOIN fees
ON students.student_id = fees.student_id
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err)
res.status(500).json(err)
}
else{
res.json(result)
}

})

})
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
}
else {
res.json({ message: "Fee Record Added" });
}

});

});
app.put("/updateFee/:id",(req,res)=>{

const id = req.params.id
const {status} = req.body

const sql = "UPDATE fees SET status=? WHERE fee_id=?"

db.query(sql,[status,id],(err,result)=>{

if(err){
console.log(err)
res.send(err)
}
else{
res.json({message:"Fee Updated"})
}

})

})
app.put("/resetFees",(req,res)=>{

const sql = `
UPDATE fees
SET status = 'Pending',
payment_date = NULL
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err)
res.status(500).send(err)
}
else{
res.json({message:"Fees Reset Successfully"})
}

})

})

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
app.put("/updateMaintenance/:id",(req,res)=>{

const id = req.params.id
const {status} = req.body

const sql = "UPDATE maintenance SET status=? WHERE request_id=?"

db.query(sql,[status,id],(err,result)=>{

if(err){
console.log(err)
res.send(err)
}
else{
res.json({message:"Status Updated"})
}

})

})

/* ========================
   VISITORS API
======================== */
app.get("/visitors",(req,res)=>{

const sql="SELECT * FROM visitors"

db.query(sql,(err,result)=>{

if(err){
res.send(err)
}
else{
res.json(result)
}

})

})

app.post("/addVisitor",(req,res)=>{

const {visitor_name, student_name, relation, visit_date} = req.body

// find student id using name
const findStudent = "SELECT student_id FROM students WHERE name=?"

db.query(findStudent,[student_name],(err,result)=>{

if(err) return res.send(err)

if(result.length===0){
return res.send("Student not found")
}

const student_id = result[0].student_id

const sql = "INSERT INTO visitors(visitor_name,student_id,relation,visit_date) VALUES(?,?,?,?)"

db.query(sql,[visitor_name,student_id,relation,visit_date],(err,data)=>{

if(err) return res.send(err)

res.json({message:"Visitor Added"})

})

})

})


/* ========================
   SERVER
======================== */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});