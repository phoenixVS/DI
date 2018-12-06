'use strict';

const wrapFunction = (key, fn) => {
  return (...args) => {
    if (args.length > 0) {
      let callback = args[args.length - 1];
      if (typeof callback === 'function') {
        args[args.length - 1] = (...args) => {
          callback(...args);
        };
      } else {
        callback = null;
      }
    }
    const result = fn(...args);
    return result;
  };
};

const cloneInterface = anInterface => {
  const clone = {};
  for (const key in anInterface) {
    const fn = anInterface[key];
    clone[key] = wrapFunction(key, fn);
  }
  return clone;
};

module.exports = { cloneInterface, wrapFunction };
