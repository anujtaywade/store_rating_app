const pool = require("../config/db");

async function getStores() {
  const result = await pool.query(`
    SELECT s.id, s.name, s.email, s.address, u.name AS owner_name,
           COALESCE(AVG(r.rating),0)::numeric(2,1) AS avg_rating
    FROM stores s
    JOIN users u ON s.owner_id = u.id
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id, u.name
    ORDER BY s.id ASC
  `);
  return result.rows;
}

async function rateStore({ user_id, store_id, rating }) {
  const result = await pool.query(
    `INSERT INTO ratings (user_id, store_id, rating) 
     VALUES ($1,$2,$3)
     ON CONFLICT (user_id, store_id) DO UPDATE SET rating=$3, updated_at=NOW()
     RETURNING *`,
    [user_id, store_id, rating]
  );
  return result.rows[0];
}

module.exports = { getStores, rateStore };
