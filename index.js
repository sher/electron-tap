var path = require('path');
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win = null;

app.on('window-all-closed', app.quit);

app.on('ready', function onReady() {
  win = new BrowserWindow({ title: 'Tests' });
  win.loadURL(path.join('file://', __dirname, 'index.html'));
  win.on('closed', function onClose() { win = null; });
});
