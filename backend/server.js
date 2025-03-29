const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static files from uploads folder

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "proot",
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.error("database connection failed:", err);
    return;
  }
  console.log("connected to database");
});

app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

app.post("/searchEmployee", (req, res) => {
  const { value } = req.query;
  const sql = `SELECT * FROM employee WHERE name LIKE '%${value}%' OR employee_id LIKE '%${value}%'`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/viewEmployee/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM employee WHERE ID = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("error");
    if (data.length === 0) return res.json("employee not found");
    return res.json(data[0]);
  });
});

// 🚀 Updated route with photo upload
app.post("/createEmployees", upload.single("photo"), (req, res) => {
  const {
    name,
    employee_id,
    department,
    designation,
    project,
    type,
    status,
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO employee (name, employee_id, department, designation, project, type, status, photo) VALUES (?,?,?,?,?,?,?,?)";
  const values = [
    name,
    employee_id,
    department,
    designation,
    project,
    type,
    status,
    photo,
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Employee created", data });
  });
});

app.put("/updateEmployee/:id", (req, res) => {
  const id = req.params.id;
  const { name, employee_id, department, designation, project, type, status } =
    req.body;
  const sql =
    "UPDATE employee SET name = ?, employee_id = ?, department = ?, designation = ?, project = ?, type = ?, status = ? WHERE id = ?";
  const values = [
    name,
    employee_id,
    department,
    designation,
    project,
    type,
    status,
  ];
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Employee updated", data });
  });
});

app.delete("/deleteEmployee/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employee WHERE ID = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Employee deleted", data });
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
