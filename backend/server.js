const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection setup

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "", // your MySQL password
  database: "credenti", // your database name
  port: 3307
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// API Route to handle form submission
app.post("/api/contact", (req, res) => {
  const { name, email, company, website } = req.body;

  // Basic server-side validation
  if (!name || !email || !company || !website) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\w\d\-_]+\.+\S+)$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!urlRegex.test(website)) {
    return res.status(400).json({ message: "Invalid website URL." });
  }

  const sql = "INSERT INTO contacts (name, email, company, website) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, company, website], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
    res.json({ message: "Form submitted successfully!" });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
