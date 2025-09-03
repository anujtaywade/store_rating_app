const pool = require("../config/db");

async function getDashboardStats() {
  const users = await pool.query("SELECT COUNT(*) FROM users");
  const stores = await pool.query("SELECT COUNT(*) FROM stores");
  const ratings = await pool.query("SELECT COUNT(*) FROM ratings");

  return {
    totalUsers: users.rows[0].count,
    totalStores: stores.rows[0].count,
    totalRatings: ratings.rows[0].count,
  };
}

async function getUsers(filter = {}) {
  let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
  const params = [];
  let i = 1;

  if (filter.name) {
    query += ` AND name ILIKE $${i++}`;
    params.push(`%${filter.name}%`);
  }
  if (filter.email) {
    query += ` AND email ILIKE $${i++}`;
    params.push(`%${filter.email}%`);
  }
  if (filter.role) {
    query += ` AND role=$${i++}`;
    params.push(filter.role);
  }

  const result = await pool.query(query, params);
  return result.rows;
}

async function getStores(filter = {}) {
  let query = `
    SELECT s.id, s.name, s.email, s.address, u.name AS owner_name,
           COALESCE(AVG(r.rating),0)::numeric(2,1) AS avg_rating
    FROM stores s
    JOIN users u ON s.owner_id = u.id
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;
  const params = [];
  let i = 1;

  if (filter.name) {
    query += ` AND s.name ILIKE $${i++}`;
    params.push(`%${filter.name}%`);
  }
  if (filter.email) {
    query += ` AND s.email ILIKE $${i++}`;
    params.push(`%${filter.email}%`);
  }

  query += " GROUP BY s.id, u.name ORDER BY s.id ASC";

  const result = await pool.query(query, params);
  return result.rows;
}

async function addUser({ name, email, password, address, role }) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, address, role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role",
    [name, email, password, address, role]
  );
  return result.rows[0];
}

async function addStore({ name, email, address, owner_id }) {
  const result = await pool.query(
    "INSERT INTO stores (name, email, address, owner_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, address, owner_id]
  );
  return result.rows[0];
}

module.exports = { getDashboardStats, getUsers, getStores, addUser, addStore };
