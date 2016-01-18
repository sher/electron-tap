var glob = require('glob');
var resolvePath = require('path').resolve;
var cwd = process.cwd();
require('babel-register');

glob('test/**/*-test.js?(x)', function (err, files) {
  files.forEach(function (file) {
    require(resolvePath(cwd, file));
  });
});
