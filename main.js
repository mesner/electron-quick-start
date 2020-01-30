// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      nativeWindowOpen: true,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000/')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    // if (frameName === 'modal') {
    //   // open window as modal
    //   event.preventDefault()
    //   Object.assign(options, {
    //     modal: true,
    //     parent: mainWindow,
    //     width: 100,
    //     height: 100
    //   })
      
    //   event.newGuest = new BrowserWindow(options)
    // }

    event.preventDefault()
    event.newGuest = new BrowserWindow(options)
    let view = new BrowserView({webPreferences:{affinity: "browserview"}})
    // let view = new BrowserView()
    event.newGuest.setBrowserView(view)
    console.log(`options`)
    console.dir(options, {depth:null})
    view.setBounds({ x: 0, y: 100, width: options.width, height: options.height - 100 })
    view.webContents.loadURL('https://google.com');
    // view.webContents.loadURL('about:blank');
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
