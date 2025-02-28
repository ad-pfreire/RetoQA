// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   viewportHeight: 1080,
//   viewportWidth: 1920,
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },

//     baseUrl: 'https://www.demoblaze.com',
//     specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
//   },
// });


const { defineConfig } = require('cypress');
module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: true,
    json: false
  },
  e2e: {
    // ... otras configuraciones e2e ...
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  }
});
