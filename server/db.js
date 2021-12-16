import pg from "pg";
const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: "mya",
      password: "mya",
      host: "localhost",
      database: "cyf-videos",
      port: "5432",
    };

const pool = new Pool(poolConfig);
export default pool;
