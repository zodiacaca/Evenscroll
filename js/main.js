
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  location.reload();
});

const body = document.getElementsByTagName('body').item(0)
const scroll = document.createElement("div")
scroll.setAttribute("id", "evenscroll")
body.appendChild(scroll)
