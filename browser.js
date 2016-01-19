var glob = require('glob');
var path = require('path');
var cwd = process.cwd();
var watch = require('glob-watcher');

module.exports = function browserRunner(browserGlob) {
  glob(browserGlob, function (err, files) {
    files.forEach(function(file) {
      require(path.resolve(cwd, file));
    });
  });

  var watcher = watch(browserGlob);
  watcher.on('change', function(event) {
    flush();
    require(path.resolve(cwd, event.path));
  });
}

function flush() {
  Object.keys(require.cache).forEach((function (fname) {
    if (fname.indexOf('node_modules') === -1) {
      delete require.cache[fname];
    }

    var mods = ['tape'];
    mods.forEach(function (mod) {
      if (fname.indexOf(path.join(cwd, mod) + path.sep) > -1 ||
        fname.indexOf(path.join(cwd, 'node_modules', mod) + path.sep) > -1) {
          delete require.cache[fname];
      }
    })
  }));
}
