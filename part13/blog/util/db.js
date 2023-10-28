const { Sequelize } = require('sequelize');
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize }),
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    await runMigrations();
  } catch (e) {
    console.log('Unable to connect to DB.', e);
  }
})();

module.exports = { sequelize, rollbackMigrations };
