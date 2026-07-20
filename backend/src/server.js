// Enterprise REST API Engine - Maintained by M Durga Prasad
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

// 🔒 Secure CORS configuration for your custom domain
app.use(cors({
  origin: 'https://prassadhmulticloud.online',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_vault_key_fallback';
// const app = express();
// app.use(cors());
// app.use(express.json());

// const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_vault_key';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://calc_admin:VaultPass99@localhost:5432/calculator_db'
});

// Structural Database Schema Verification
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS calculation_history (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      calc_type VARCHAR(30) NOT NULL,
      expression TEXT NOT NULL,
      result TEXT NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
initDB().catch(console.error);

// Middleware to Validate Access Tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTING INTERFACES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, hash]
    );
    res.status(201).json({ userId: result.rows[0].id, msg: "Registration successful" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists or invalid data configuration." });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.rows.length === 0) return res.status(400).json({ error: "User record not found." });

  const user = result.rows[0];
  const validPass = await bcrypt.compare(password, user.password_hash);
  if (!validPass) return res.status(403).json({ error: "Invalid credentials." });

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// --- CORE CALCULATION ENGINES ---
app.post('/api/calculate', authenticateToken, async (req, res) => {
  const { type, expression, result } = req.body;
  try {
    await pool.query(
      'INSERT INTO calculation_history (user_id, calc_type, expression, result) VALUES ($1, $2, $3, $4)',
      [req.user.userId, type, expression, String(result)]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to persist log data." });
  }
});

app.get('/api/history', authenticateToken, async (req, res) => {
  const history = await pool.query(
    'SELECT calc_type as type, expression, result, executed_at FROM calculation_history WHERE user_id = $1 ORDER BY executed_at DESC LIMIT 50',
    [req.user.userId]
  );
  res.json(history.rows);
});

// Proactive Cluster Health Validation Probe
app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

app.listen(8080, () => console.log('Server running on cluster routing port 8080'));