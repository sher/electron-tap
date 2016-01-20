var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var glob = require('glob');
var path = require('path');
var cwd = process.cwd();
var watch = require('glob-watcher');

ipcRenderer.on('run', function(sender, rendererGlob) {
  glob(rendererGlob, function (err, files) {
    files.forEach(function(file) {
      require(path.resolve(cwd, file));
    });
  });

  var watcher = watch(rendererGlob);
  watcher.on('change', function(event) {
    flush();
    require(path.resolve(cwd, event.path));
  });
});

function flush() {
  console.clear();

  Object.keys(require.cache).forEach((function (fname) {
    if (fname.indexOf('node_modules') === -1) {
      delete require.cache[fname];
    }

    var mods = ['tape', 'electron-tap'];
    mods.forEach(function (mod) {
      if (fname.indexOf(path.join(cwd, mod) + path.sep) > -1 ||
        fname.indexOf(path.join(cwd, 'node_modules', mod) + path.sep) > -1) {
          delete require.cache[fname];
      }
    })
  }))
}
