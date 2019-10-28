// Modules to control application life and create native browser window
const {app, BrowserWindow, protocol} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} 

protocol.registerSchemesAsPrivileged([
  { scheme: 'iantest2', privileges: { standard: true, secure: true } },
])

if(!app.isDefaultProtocolClient('iantest')) {
  let reg = app.setAsDefaultProtocolClient('iantest')
  console.log(`setAsDefaultProtocolClient ${reg}`)
}


function createWindow () {

  
  protocol.registerStringProtocol('iantest2', (request, callback) => {
    console.log(request.url)
    callback(`Hello from ${request.url}`)
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://127.0.0.1:8080/index.html')
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    app.removeAsDefaultProtocolClient('iantest')
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('second-instance', (event, commandLine, workingDirectory) => {
  console.log(`second-instance ${commandLine}, ${workingDirectory}`)
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()

})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
