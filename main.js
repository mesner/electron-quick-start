// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = {}

function createWindow () {

  let displays = electron.screen.getAllDisplays()
  let maxMon = displays.sort((d1,d2)=>d1.width-d2.width)[displays.length-1];

  for(var xi = maxMon.bounds.x; xi < maxMon.bounds.x + maxMon.bounds.width; xi += maxMon.bounds.width / 8 ) {
    for(var yi = maxMon.bounds.y; yi < maxMon.bounds.y + maxMon.bounds.height; yi += maxMon.bounds.height / 8 ) {
      console.log([xi,yi])
      let mw = new BrowserWindow({
        x:xi,
        y:yi,
        width: maxMon.bounds.width / 8,
        height: maxMon.bounds.height / 8
        ,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      })

      mw.loadURL('https://gizmodo.com/')

      // Open the DevTools.
      // mainWindow.webContents.openDevTools()

      // Emitted when the window is closed.
      mw.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mw = null
      })
    }
  }

  // console.log(`w/h:${[maxMon.bounds.width / 8, maxMon.bounds.height / 8]}`)
  // Create the browser window.

    electron.ipcMain.on('heartbeat', (e) => {
      console.log(`heartbeat from id:${e.sender.id}`)
      mainWindow[e.sender.id] = true
    });


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
