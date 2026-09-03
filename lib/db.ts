import mysql from 'mysql2/promise';

/**
 * Support dua format konfigurasi database:
 *
 * Format 1 — DATABASE_URL (disarankan teman):
 *   DATABASE_URL="mysql://user:password@host:3306/dbname"
 *
 * Format 2 — Variabel terpisah (format lama, tetap berfungsi):
 *   DB_HOST, DB_USER, DB_PASS, DB_NAME
 *
 * Jika DATABASE_URL ada, format itu yang dipakai (prioritas).
 */

function getDbConfig() {
  const url = process.env.DATABASE_URL;

  if (url) {
    // Parse format: mysql://user:password@host:port/database
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parsed.port ? parseInt(parsed.port) : 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ''), // hapus "/" di depan
    };
  }

  // Fallback ke variabel terpisah
  return {
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'smp_bbs',
  };
}

const pool = mysql.createPool({
  ...getDbConfig(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
