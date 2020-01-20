// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  if(window.location.href.match(/Parent/)) {
    var childWindow = window.open('https://en.wikipedia.org/wiki/Child');
    window.addEventListener('focus', () => {
      childWindow.document.body.style.backgroundColor = 'lightblue';
      childWindow.focus();
    })
  }
})
