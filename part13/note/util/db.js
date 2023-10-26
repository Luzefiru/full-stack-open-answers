const { Sequelize } = require('sequelize');
const { DATABASE, USER, POSTGRES_PASSWORD } = require('./config');

const sequelize = new Sequelize(DATABASE, USER, POSTGRES_PASSWORD, {
  host: 'localhost', // service name in docker compose networks
  port: 5432,
  dialect: 'postgres',
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectToDB();

module.exports = sequelize;
