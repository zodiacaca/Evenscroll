
const b = typeof browser !== 'undefined' ? browser : chrome

b.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.event == "reloadPage") {
    location.reload()
  } else if (message.action) {
    if (message.action.includes('hide')) {
      document.body.style.overflowY = 'hidden'
      hideScroll = true
    } else {
      document.body.style.overflowY = 'auto'
      hideScroll = false
    }
  }
})


const html = document.getElementsByTagName('html').item(0)
const body = document.getElementsByTagName('body').item(0)

const main = () => {

  // custom
  const options = {
    dragMultiplier: 2.5,
    hideScrollbar: false
  }

  function onGot(result) {
    Object.assign(options, result.options)

    if (options.hideScrollbar) {
      document.body.style.overflowY = 'hidden'
      hideScroll = true
    }
  }

  b.storage.local.get(options, onGot)

  // elements
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

    mouseDownExtended()
  }

  function dragMouseMove(e) {
    e.preventDefault()

    const distY = e.clientY - getClientOffset(slide).top
    const ncrmnt = e.clientY - pos.y
    const top = (slide.offsetTop + ncrmnt).clamp(0, rail.offsetHeight - slide.offsetHeight)
    slide.style.top = top + "px"
    // if (e.clientY > getClientOffset(rail).top + distY && e.clientY < getClientOffset(rail).top + rail.offsetHeight - slide.offsetHeight + distY) {
      const multi = options.dragMultiplier || 2.5
      html.scrollTop = html.scrollTop + ncrmnt * multi
    // }
    pos.y = e.clientY
  }

  function stopDrag() {
    isMDown = false
    document.removeEventListener("mousemove", dragMouseMove)
    document.removeEventListener("mouseup", stopDrag)
  }

  // ticks
  let currentX = 0
  function magMouseMove(e) {
    currentX = e.clientX
  }
  document.addEventListener("mousemove", magMouseMove)

  function step(timestamp) {
    if (!isMDown) {
      const pos = lerp(0.25, slide.offsetTop, rail.offsetHeight / 2 - slide.offsetHeight / 2)
      slide.style.top = pos + "px"
    }
    const styleLeft = parseFloat(window.getComputedStyle(slide).left)
    if (!isNaN(styleLeft)) {
      if (currentX > html.clientWidth * 0.9) {
        let left = currentX - (getClientOffset(rail).left + rail.offsetWidth * 0.5)
        left = left.clamp(-slide.offsetWidth * 0.5 + bulge.offsetWidth * 0.5, slide.offsetWidth * 0.5 - bulge.offsetWidth * 0.5)
        left = lerp(0.1, styleLeft, left)
        slide.style.left = left + "px"
        bulge.style.left = (-left + convertEmToPixel(scroll, 2)) + "px"
      } else {
        let left = lerp(0.2, styleLeft, 0)
        slide.style.left = left + "px"
        bulge.style.left = (-left + convertEmToPixel(scroll, 2)) + "px"
      }
    }

    stepExtended(slide, isMDown)

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step)

  extra(scroll, slide)

}

if (body.clientHeight > window.innerHeight * 3) {
  main()
}
