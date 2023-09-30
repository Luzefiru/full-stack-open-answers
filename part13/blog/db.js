const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
  } catch (e) {
    console.log('Unable to connect to DB.', e);
  }
})();

module.exports = sequelize;
