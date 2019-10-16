const process2 = process//require('process')
const electron = require('electron')
const {ipcRenderer} = electron;
const fs = require('fs')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.launchChild = function launchChild() {
  // ipcRenderer.send('launchChild', 'ping')
  window.mychildwindow = window.open("http://localhost:8080/welcomechild/welcome.html")
}

