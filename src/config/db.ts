import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

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
