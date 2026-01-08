// import {Pool} from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// // fungsi cek koneksi
// export const checkDatabaseConnection = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("✅ Terhubung ke postgresql");
//     client.release();
//   } catch (error) {
//     console.log("❌ Gagal konek ke database", error);
//   }
// };

// export default pool;

// we move to drizzle orm
import {Pool} from "pg";
import dotenv from "dotenv";
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "../db/schema.ts"; // Impor semua tabel yang sudah Anda buat

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Gunakan format postgres://user:pass@host:port/db
  ssl: {rejectUnauthorized: false},
});

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

export const db = drizzle(pool, {schema});

// fungsi cek koneksi
export const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Terhubung ke postgresql");
    client.release();
  } catch (error) {
    console.log("❌ Gagal konek ke database", error);
  }
};

export default pool;
