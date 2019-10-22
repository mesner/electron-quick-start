// Modules to control application life and create native browser window
const electron = require('electron')
const path = require('path')
const { spawn } = require('child_process');

const { windowManager } = require("node-window-manager");
 
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, childnp

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  let cp = spawn("notepad.exe")
  console.log(cp.pid)
  let npwin;
  
  
  mainWindow.on('move', function() {

    if(!npwin) {
      npwin = windowManager.getWindows().find(win => win.processId==cp.pid)
      npwin.setStyle()
    }
    
    
    let mainWindowBounds = mainWindow.getBounds()
    let mainWindowBoundsScreen = electron.screen.dipToScreenRect(mainWindow, mainWindowBounds)
    let mainWindowMonitor = npwin.getMonitor()
    let scaleFactor = windowManager.getScaleFactor(mainWindowMonitor)
    
    let npBounds = {
      x: Math.round((mainWindowBoundsScreen.x) / scaleFactor),
      y: Math.round((mainWindowBoundsScreen.y + mainWindowBoundsScreen.height) / scaleFactor),
      width: Math.round(mainWindowBounds.width),
      height: Math.round(mainWindowBounds.height)
    }

    // npwin.bringToTop();
    
    
    // console.log(`main bounds: ${Object.values(mainWindowBounds)}`)
    // console.log(`np bounds: ${Object.values(npwin.getBounds())}`)
    // console.log(`np bounds calc: ${Object.values(npBounds)}`)
    // console.log(`main bounds screenToDip: ${Object.values(electron.screen.screenToDipRect(mainWindow, mainWindowBounds))}`)
    // console.log(`main bounds DipToScreen: ${Object.values(electron.screen.dipToScreenRect(mainWindow, mainWindowBounds))}`)
    
    
    npwin.setBounds(npBounds)

    // npBounds = npwin.getBounds()
    
    // console.log(`np bounds: ${Object.values(npBounds)}`)
    // npBounds = electron.screen.dipToScreenRect(mainWindow, npBounds)
    // console.log(`np converted bounds: ${Object.values(npBounds)}`)
    // // npwin.setBounds(Object.assign({}, mainWindowBounds,  { x: mainWindowBounds.x + mainWindowBounds.width }))  
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
