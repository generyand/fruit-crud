import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

// Create the database if it doesn't exist
const createDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
  } catch (err) {
    if (err.code !== '42P04') { // 42P04 is the error code for "database already exists"
      console.error('Error creating database:', err);
    }
  } finally {
    await client.end();
  }
};

await createDatabase();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

export default sequelize;
