require('dotenv').config();

module.exports = {
  DATABASE: process.env.DATABASE,
  USER: process.env.USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};
