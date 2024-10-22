// Load environment variables from a .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

// Create a new Pool instance for managing PostgreSQL database connections
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
});

/**
 * Connects to the PostgreSQL database and logs the status.
 * If the connection fails, logs the error and exits the process with a non-zero status code.
 */
const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

// Export the pool instance and the connectToDb function for use in other modules
export { pool, connectToDb };