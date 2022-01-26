
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  location.reload();
});

const body = document.getElementsByTagName('body').item(0)
const scroll = document.createElement("div")
scroll.setAttribute("id", "evenscroll")
body.appendChild(scroll)

const rail = document.createElement("div")
rail.setAttribute("class", "rail")
scroll.appendChild(rail)
const slide = document.createElement("div")
slide.setAttribute("class", "slide")
slide.setAttribute("draggable", "true")
rail.appendChild(slide)

// drag operation
const pos = {
  'x': 0,
  'y': 0
}
slide.onmousedown = dragMouseDown

function dragMouseDown(e) {
  e.preventDefault()

  document.addEventListener("mousemove", dragMouseMove)
  document.addEventListener("mouseup", stopDrag)

  pos.y = e.clientY
}

function dragMouseMove(e) {
  e.preventDefault()

  const ncrmnt = e.clientY - pos.y
  slide.style.top = (slide.offsetTop + ncrmnt) + "px"
  pos.y = e.clientY
}

function stopDrag() {
  document.removeEventListener("mousemove", dragMouseMove)
  document.removeEventListener("mouseup", stopDrag)
}
