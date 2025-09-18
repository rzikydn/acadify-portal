// server.js
import express from "express";
import pkg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi PostgreSQL
const pool = new Pool({
  user: "postgres",         // ganti sesuai username PostgreSQL
  host: "localhost",        
  database: "acadify_auth", 
  password: "admin123",     
  port: 5432,               
});

// Test koneksi
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

// =====================
// ROUTES
// =====================

// Register
app.post("/api/register", async (req, res) => {
  const { full_name, email, password } = req.body; // ✔ key sesuai frontend

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [full_name, email, hashedPassword]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") { // unique violation
      res.status(400).json({ success: false, message: "Email sudah terdaftar!" });
    } else {
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Email tidak ditemukan" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Password salah" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
