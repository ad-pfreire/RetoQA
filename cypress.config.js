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
    // baseUrl: 'https://api.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  }
});


// PRUEBAS API 

// const { defineConfig } = require('cypress');
// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: 'Reporte DemoBlaze',
//     embeddedScreenshots: true,
//     inlineAssets: true
//     
//   },
//   e2e: {
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//       return config;
//     },
//     baseUrl: 'https://api.demoblaze.com'
//   }
// });
