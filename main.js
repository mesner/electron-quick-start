// Modules to control application life and create native browser window
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, ipcMain} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let isWindowsOpen = false;
let windowCounter = 0;

global.preload = "http://localhost:3375/finsemble/FSBL.js"

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 640,
    height: 600,
    // x:3840,
    // y:469,
    webPreferences: {
      affinity: `win_${windowCounter++}`,
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

  ipcMain.on('toggleWindows', ()=> {

    if(isWindowsOpen){
      isWindowsOpen = false;
      for(let win of BrowserWindow.getAllWindows()){
        if(win.id !== mainWindow.id) win.close();
      }
    } else {
      isWindowsOpen = true;
      for(let loc of getWindowLocs(12,8)){
        let affinity = `win_${windowCounter++}`;
        console.log(`opening window at ${Object.keys(loc)}`)
        console.log(`opening window at ${Object.values(loc)}`)
        let childWin = new BrowserWindow({
          width: loc.width,
          height: loc.height,
          x: loc.left,
          y: loc.top,
          webPreferences: {
            sandbox: true,
            nodeIntegration: false,
            affinity: affinity,
            //preload: path.join(__dirname, 'preload.js')
            preload: path.join(__dirname, 'e2o.js')
            //preload: 'C:/projects/finsemble-electron-adapter/dist/e2o.js'
          }
        })
        childWin.loadURL('http://localhost:3375/components/welcome/welcome.html')
      }
    }
  });
}

const getWindowLocs = (rows,cols) => {

  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    console.log(`${Object.keys(display.bounds)}`)
    console.log(`${Object.values(display.bounds)}`)
    let isExternalDisplay = display.bounds.x !== 0 || display.bounds.y !== 0
    return !isExternalDisplay
  })

  const height = Math.floor(externalDisplay.bounds.height / rows);
  const width = Math.floor(externalDisplay.bounds.width / cols);
  
  let windowLocs = [];
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      windowLocs.push({
        top: externalDisplay.bounds.y + i * height,
        left: externalDisplay.bounds.x + j * width,
        width: width,
        height: height
      });
    }
  }
  return windowLocs;
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
