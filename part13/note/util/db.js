const { Sequelize } = require('sequelize');
const { DATABASE, USER, POSTGRES_PASSWORD } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE, USER, POSTGRES_PASSWORD, {
  host: 'localhost', // service name in docker compose networks
  port: 5432,
  dialect: 'postgres',
});

const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

const runMigrations = async () => {
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigrations = async () => {
  await sequelize.authenticate();
  await migrator.down();
};

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectToDB();

module.exports = { sequelize, rollbackMigrations };
