const { PORT } = require('./app/config');
const { logger } = require('./app/utils');
const app = require('./app');

app.listen(PORT, () => {
  logger.info(`
    🚀 Server is now running on http://127.0.0.1:${PORT}
  `);
});
