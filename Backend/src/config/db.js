const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.DB_SSL === "true") {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

pool.on("connect", () => {
  console.log(" Connected to PostgreSQL");
});

module.exports = pool;
