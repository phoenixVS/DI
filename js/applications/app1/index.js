'use strict';

// Print from the global context of application module
api.console.log('From app1 global context');

module.exports = () => {
  // Print from the exported function context

  api.fs.readFile('../../file.txt', (err, data) => {
    if (err) {
      api.console.log(err.message);
      return;
    }
    api.console.log(data.toString());
  });

  api.timers.setTimeout(() => {
    api.console.log('From app1 exported function');
  }, 5000);
};
