
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'pengelolaan_keuangan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.on('connection', conn => {
  console.log('Database is connected')
});

exports.query = async (sql, values = []) => {
  try {
    const koneksi = await pool.getConnection()
    const barisData = await koneksi.query(sql, values);
    koneksi.release()
    return barisData
  } catch (error) {
    throw error
  }
}
