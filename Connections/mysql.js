import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db=mysql.createConnection({
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_ROOT,
    password:process.env.DB_PASS
})