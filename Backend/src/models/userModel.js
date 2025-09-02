const pool = require("../config/db");

async function findByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return result.rows[0];
}

async function createUser({ name, email, password, address, role }) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, address, role) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [name, email, password, address, role]
  );
  return result.rows[0];
}

module.exports = { findByEmail, createUser };
