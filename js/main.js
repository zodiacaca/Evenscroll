
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  location.reload();
});

const body = document.getElementsByTagName('body')
const newDiv = document.createElement("div")
body.appendChild(newDiv)
