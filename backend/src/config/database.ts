import sqlite3 from 'sqlite3';
import path from 'path';

const sqlite = sqlite3.verbose();

//path to the database file.
const DB_PATH = path.resolve(__dirname, '../../db.sqlite');

const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
    throw err;
  } else {
    console.log('Successfully connected to the SQLite database.');
  }
});

const createUserTableSql = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
    status TEXT NOT NULL CHECK(status IN ('active', 'inactive')),
    createdAt TEXT NOT NULL,
    signature TEXT NOT NULL,
    publicKey TEXT NOT NULL
  );
`;

db.run(createUserTableSql, (err) => {
  if (err) {
    console.error('Error creating users table:', err.message);
    process.exit(1); 
  } else {
    console.log('Users table is ready.');
  }
});

export default db;
