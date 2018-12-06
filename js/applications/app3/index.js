'use strict';

// Print from the global context of application module
api.console.log('From app3 global context');

const fs = require('fs'); 

module.exports = () => {
  // Print from the exported function context
  api.timers.setTimeout(() => {
    api.console.log('From app3 exported function');
  }, 5000);
};