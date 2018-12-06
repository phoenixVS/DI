'use strict';

// Print from the global context of application module
api.console.log('From app2 global context');

module.exports = () => {
  // Print from the exported function context
  api.timers.setTimeout(() => {
    api.console.log('From app2 exported function');
  }, 5000);
};
