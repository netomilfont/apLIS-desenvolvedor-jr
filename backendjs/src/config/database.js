const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'aplis_db',
  user:     process.env.DB_USER || 'aplis',
  password: process.env.DB_PASS || 'aplis123',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;