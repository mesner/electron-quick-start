// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');
const util = require('util')


//var mouseConstructor = require('osx-mouse');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, childWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false
    }
  })

  childWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false
    }
  })

  childWindow2 = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false
    }
  })

  childWindow3= new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://127.0.0.1:8080/index.html')
  childWindow.loadURL('http://127.0.0.1:8080/index.html')
  childWindow2.loadURL('http://127.0.0.1:8080/index.html')
  childWindow3.loadURL('http://127.0.0.1:8080/index.html')


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

electron.ipcMain.on('move-window-js', (e, data)=> {
  const { mouseX, mouseY} = data;
  const { x, y } = electron.screen.getCursorScreenPoint()
  // console.dir(`setting position to ${[x - mouseX, y - mouseY]}`)
  
  let bounds = mainWindow.getBounds();
  
  console.dir(`current bounds ${[bounds.x, bounds.y, bounds.height, bounds.width]}`)

  mainWindow.setBounds({x:x - mouseX, y: y - mouseY, width: 400, height: 400})

  // childWindow.setPosition(x - mouseX + bounds.width, y - mouseY);
  childWindow.setBounds({x:x - mouseX + 400, y: y - mouseY, width: 400, height: 400})

  // mainWindow.setBounds({x:x - mouseX, y: y - mouseY, width: 400, height: 400})
  childWindow2.setBounds({x:x - mouseX, y: y - mouseY + 400, width: 400, height: 400})
  // childWindow2.setPosition(x - mouseX, y - mouseY + bounds.height);

  childWindow3.setBounds({x:x - mouseX + 400, y: y - mouseY + 400, width: 400, height: 400})
  // childWindow3.setPosition(x - mouseX + bounds.width, y - mouseY + bounds.height);
})

//let mouse = mouseConstructor();
let offset;

// mouse.on('left-drag', function(x, y) {
//   if(!offset) return;

//   x = Math.round(x - offset[0]);
//   y = Math.round(y - offset[1]);
  
//   mainWindow.setPosition(x, y);
  
//   let bounds = mainWindow.getBounds();


//   childWindow.setPosition(x + bounds.width, y)
// });

// mouse.on('left-up', function() {
//   offset = null;
//   clearInterval(moveInterval);
// });

ipcMain.on("start-moving", (e, data) => {
  console.log("start-moving");
  offset = data;
});

let moveInterval;
ipcMain.on("start-moving-poll", (e, data) => {
  console.log("start-moving-poll");
  let pollingOffset = data;

  moveInterval = setInterval(function() {
    
    let { x, y } = electron.screen.getCursorScreenPoint()
  
    x = Math.round(x - pollingOffset[0]);
    y = Math.round(y - pollingOffset[1]);
    
    mainWindow.setPosition(x, y);

    // let bounds = mainWindow.getBounds();
    // let pos = {
    //   x: bounds.x + mainWindow.width,
    //   y: bounds.y
    // }
    
  },0);
});

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
