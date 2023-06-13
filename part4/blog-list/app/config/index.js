require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('../utils');

// see .env.example for setup
const PORT = process.env.PORT || 3001;
const MONGODB_STRING = process.env.MONGODB_STRING;

mongoose.set('strictQuery', false);
async function connectToMongoDB() {
  logger.info('Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_STRING);
    logger.info('Successfully connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB.');
  }
}

connectToMongoDB();

module.exports = { PORT };
