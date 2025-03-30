const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
  const sql = `SELECT * FROM employee WHERE name LIKE '%${value}%' OR employee_id LIKE '%${value}%' OR department LIKE '%${value}%'  OR designation LIKE '%${value}%'  OR project LIKE '%${value}%' OR type LIKE '%${value}%' OR status LIKE '%${value}%'`;
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

app.post("/createEmployees", upload.single("photo"), (req, res) => {
  const id = uuidv4();
  const { name, employee_id, department, designation, project, type, status } =
    req.body;
  const photo = req.file ? req.file.filename : null;
  const sql =
    "INSERT INTO employee (id, name, employee_id, department, designation, project, type, status, photo) VALUES (?,?,?,?,?,?,?,?,?)";
  const values = [
    id,
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
    console.log("eerrr", err);
    if (err) return res.json(err);
    return res.json({ message: "Employee created", id });
  });
});

app.put("/updateEmployee/:id", upload.single("photo"), (req, res) => {
  const id = req.params.id;
  const { name, employee_id, department, designation, project, type, status } =
    req.body;
  let newPhoto = req.file ? req.file.filename : null;
  const getPhotoQuery = "SELECT photo FROM employee WHERE id = ?";
  db.query(getPhotoQuery, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    const existingPhoto = results[0]?.photo;
    if (!newPhoto) newPhoto = existingPhoto;
    const sql =
      "UPDATE employee SET name = ?, employee_id = ?, department = ?, designation = ?, project = ?, type = ?, status = ?, photo = ? WHERE id = ?";
    const values = [
      name,
      employee_id,
      department,
      designation,
      project,
      type,
      status,
      newPhoto,
      id,
    ];

    db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Employee updated successfully", data });
    });
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
