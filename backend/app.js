const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes - remove the /api prefix since server.js already handles that
app.use('/users', require('./routes/users'));
app.use('/submissions', require('./routes/submissions'));

// Error handler
app.use(errorHandler);

module.exports = app;
