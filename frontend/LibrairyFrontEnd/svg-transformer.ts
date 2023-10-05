const { extname } = require('path');

module.exports = {
  process(src, filename, config, options) {
    if (extname(filename).toLowerCase() === '.svg') {
      return `module.exports = ${JSON.stringify(src)};`;
    }
    return src;
  },
};
