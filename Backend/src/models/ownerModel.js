const pool = require("../config/db");

async function getMyStores(owner_id) {
  const result = await pool.query(
    `SELECT s.id, s.name, s.email, s.address,
            COALESCE(AVG(r.rating),0)::numeric(2,1) AS avg_rating
     FROM stores s
     LEFT JOIN ratings r ON s.id = r.store_id
     WHERE s.owner_id=$1
     GROUP BY s.id
     ORDER BY s.id ASC`,
    [owner_id]
  );
  return result.rows;
}

async function getStoreRatings(owner_id, store_id) {
  const result = await pool.query(
    `SELECT r.id, r.rating, r.created_at, u.name AS user_name
     FROM ratings r
     JOIN users u ON r.user_id = u.id
     JOIN stores s ON r.store_id = s.id
     WHERE s.id=$1 AND s.owner_id=$2
     ORDER BY r.created_at DESC`,
    [store_id, owner_id]
  );
  return result.rows;
}

module.exports = { getMyStores, getStoreRatings };
