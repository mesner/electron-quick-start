// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var electron = require('electron')

var drag = require('electron-drag');


// electron.remote.getCurrentWindow().webContents.executeJavaScript("alert('test eval in preload')")

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('load', () => {
  for (const versionType of ['chrome', 'electron', 'node']) {
    document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
  }

  //eval("alert('test eval2 in preload')")

  // electron.remote.getCurrentWindow().webContents.executeJavaScript("alert('test executeJavascript in preload')");

  // Pass a query selector or a dom element to the function.
  // Dragging the element will drag the whole window.
  
  var clear = drag('#draggable');

	var onmousedown = function(e) {
    offset = [e.clientX, e.clientY];
    electron.ipcRenderer.send("start-moving", offset);
  };
  

	var onmousedownPoll = function(e) {
    offset = [e.clientX, e.clientY];
    electron.ipcRenderer.send("start-moving-poll", offset);
	};

  var element = document.getElementById('draggable-main');
	element.addEventListener('mousedown', onmousedown);


  var element = document.getElementById('draggable-main-poll');
	element.addEventListener('mousedown', onmousedownPoll);

  let mouseX, mouseY, animationId;

  let onMouseDown = (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		document.addEventListener('mouseup', onMouseUp)
		window.requestAnimationFrame(moveWindow);
  }

  let onMouseUp = (e) => {
      document.removeEventListener('mouseup', onMouseUp)
      window.cancelAnimationFrame(animationId)
  }

  let moveWindow = () => {
		const { x, y } = electron.remote.screen.getCursorScreenPoint()
    electron.remote.getCurrentWindow().setPosition(x - mouseX, y - mouseY)
		animationId = requestAnimationFrame(moveWindow);
	}

  let dragHandle = document.getElementById('draggablejs');
  dragHandle.onmousedown = onMouseDown;

  
  var event = new CustomEvent('FSBLready', {detail: {fin: {getState:  "test"}}})
  window.dispatchEvent(event);

})





