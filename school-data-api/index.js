const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Log environment variables to verify
console.log('Attempting to connect with the following config:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '********' : 'Not Set'); // Don't log the actual password
console.log('DB_PORT:', process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Necessary for default RDS certs unless you configure custom CA
  }
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Function to test database connection
const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully!');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.stack);
    process.exit(1); // Exit if cannot connect to DB
  }
};

// Test DB connection before starting server
testDbConnection().then(() => {
  // Simple test route
  app.get('/', (req, res) => {
    console.log('Received request for /');
    try {
      res.send('hello');
      console.log('Successfully sent response for /');
    } catch (err) {
      console.error('Error sending response for /:', err);
      // Try to send an error response if possible
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  });

  // GET /api/academic
  app.get('/api/academic', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_academic');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching academic data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET /api/career
  app.get('/api/career', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_career');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching career data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET /api/demographic
  app.get('/api/demographic', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_demographic');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching demographic data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET /api/financial
  app.get('/api/financial', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_financial');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET /api/general
  app.get('/api/general', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_general');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching general data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // GET /api/health
  app.get('/api/health', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM student_health');
      res.json(data.rows);
    } catch (error) {
      console.error('Error fetching health data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Mandatory exit after uncaught exception
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
  // Recommended: exit gracefully
  process.exit(1);
});


// psql --host=student-data-db.cxq0c6u043tu.us-east-2.rds.amazonaws.com --port=5432 --username=postgres --dbname=student-data-db