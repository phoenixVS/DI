'use strict';

// The framework can require core libraries
global.api = {};
api.fs = require('fs');
api.vm = require('vm');
api.sandboxedFs = require('../node_modules/sandboxed-fs');

const { cloneInterface, wrapFunction } = require('./wrapper');

const log = s => {
  console.log('Prints something from sandbox');
  console.log(s);
};

const safeRequire = name => {
  if (name === 'fs') {
    const msg = 'You dont have access to fs API';
    console.log(msg);
    return new Error(msg);
  } else {
    return require(name);
  }
};

const runSandboxed = path => {
  const fileName = path + 'index.js';
  const context = {
    module: {},
    require: safeRequire,
    api: {
      console: { log },
      timers: {
        setTimeout: wrapFunction('setTimeout', setTimeout)
      },
      fs: cloneInterface(api.sandboxedFs.bind(path))
    }
  };
  context.global = context;
  const sandbox = api.vm.createContext(context);
  // Read an application source code from the file
  api.fs.readFile(fileName, (err, src) => {
    // We need to handle errors here

    // Run an application in sandboxed context
    const script = new api.vm.Script(src, fileName);
    const f = script.runInNewContext(sandbox);
    if (f) f();

    // We can access a link to exported interface from sandbox.module.exports
    // to execute, save to the cache, print to console, etc.
  });
};

runSandboxed('./applications/app1/');
runSandboxed('./applications/app2/');
runSandboxed('./applications/app3/');
