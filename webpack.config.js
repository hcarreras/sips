const path = require('path');

module.exports = {
  entry: './src/application.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
};
