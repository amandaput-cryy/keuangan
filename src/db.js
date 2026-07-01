const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_NAME = 'query';
const DB_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: ''
};

let poolPromise = initializeDatabase();

async function initializeDatabase() {
  const connection = await mysql.createConnection(DB_CONFIG);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.end();

  const pool = mysql.createPool({
    ...DB_CONFIG,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const sqlFile = path.join(__dirname, 'database', 'Query.sql');
  if (fs.existsSync(sqlFile)) {
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    const statements = sqlContent
      .split(/;\s*\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const stmt of statements) {
      const normalized = stmt.replace(/^CREATE TABLE\s+(\w+)/i, 'CREATE TABLE IF NOT EXISTS $1');
      await pool.query(normalized);
    }
  }

  const conn = await pool.getConnection();
  conn.release();
  console.log(`Database '${DB_NAME}' ready and connected.`);

  return pool;
}

exports.query = async (sql, values = []) => {
  try {
    const pool = await poolPromise;
    const koneksi = await pool.getConnection();
    const hasil = await koneksi.query(sql, values);
    koneksi.release();
    return hasil;
  } catch (error) {
    console.error(error);
    throw error;
  }
};