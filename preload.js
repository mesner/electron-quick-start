const process = require('process')
const electron = require('electron')
const {ipcRenderer} = electron;

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
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
  const {totalHeapSize, usedHeapSize} = process.getHeapStatistics()
  element.innerText =  `usedHeapSize ${usedHeapSize} totalHeapSize ${totalHeapSize} at ${new Date().toLocaleTimeString()}`
}

setInterval(onMemoryUpdate, 1000)