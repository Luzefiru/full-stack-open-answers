const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://127.0.0.1:3000/',
  },
  env: {
    API_URL: 'http://127.0.0.1:3003/api',
  },
});
