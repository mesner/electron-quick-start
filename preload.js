const process2 = process//require('process')
const electron = require('electron')
const {ipcRenderer} = electron;
const fs = require('fs')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('focus', () => {
  const element = document.getElementById('txtInput')
  element.focus();
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process2.versions[type])
  }

  document.getElementById('launch').addEventListener('click', () => {
    window.toggleWindows();
  })
})

window.toggleWindows = () => {
  console.log('toggleWindows')
  ipcRenderer.send('toggleWindows', 'ping')
}

const onMemoryUpdate = () => {
  const element = document.getElementById('windows')
  const {totalHeapSize, usedHeapSize} = process2.getHeapStatistics()
  element.innerText =  `usedHeapSize ${usedHeapSize} totalHeapSize ${totalHeapSize} at ${new Date().toLocaleTimeString()}`
}

setInterval(onMemoryUpdate, 1000)