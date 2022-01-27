
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  location.reload();
});

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max)
}

const html = document.getElementsByTagName('html').item(0)
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
const bulge = document.createElement("div")
bulge.setAttribute("class", "bulge")
slide.appendChild(bulge)

// drag operation
const pos = {
  'x': 0,
  'y': 0
}
let isMDown = false
slide.onmousedown = dragMouseDown

function dragMouseDown(e) {
  e.preventDefault()

  document.addEventListener("mousemove", dragMouseMove)
  document.addEventListener("mouseup", stopDrag)

  pos.y = e.clientY
  isMDown = true
}

function dragMouseMove(e) {
  e.preventDefault()

  const ncrmnt = e.clientY - pos.y
  const top = (slide.offsetTop + ncrmnt).clamp(0, rail.offsetHeight - slide.offsetHeight)
  slide.style.top = top + "px"
  html.scrollTop = html.scrollTop + ncrmnt * 2.5
  pos.y = e.clientY
}

function stopDrag() {
  isMDown = false
  document.removeEventListener("mousemove", dragMouseMove)
  document.removeEventListener("mouseup", stopDrag)
}

// ticks
function step(timestamp) {
  if (!isMDown) {
    const pos = lerp(0.5, slide.offsetTop, rail.offsetHeight / 2 - slide.offsetHeight / 2)
    slide.style.top = pos + "px"
  }

  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step)

function lerp(t, from, to) {
  return from + (to - from) * t
}
