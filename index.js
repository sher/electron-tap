var path = require('path');
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win = null;

var argv = require('minimist')(process.argv.slice(2));
var browserGlob = argv['browser'];
var browserRunner = require('./browser');
var rendererGlob = argv['renderer'];

require('babel-register');

app.on('window-all-closed', app.quit);

app.on('ready', function onReady() {
  win = new BrowserWindow({ title: 'Tests' });

  win.loadURL(path.join('file://', __dirname, 'index.html'));

  win.webContents.on('did-finish-load', function onDidFinishLoad() {
    browserRunner(browserGlob);
    win.webContents.send('run', rendererGlob);
  });

  win.on('closed', function onClose() { win = null; });
});
