
let targetScroll = 0
let hideScroll = false

function stepExtended(smoothSpeed, slide, isMDown) {
  if ((hideScroll || slide.matches(':hover')) && !isMDown) {
    html.scrollTop = lerp(smoothSpeed, html.scrollTop, targetScroll)
  } else {
    targetScroll = html.scrollTop
  }
}

let lastClick = 0

function mouseDownExtended(e) {
  if (Date.now() - lastClick <= 200) {
    if (hideScroll) {
      document.body.style.overflowY = 'auto'
      hideScroll = false
    } else {
      document.body.style.overflowY = 'hidden'
      hideScroll = true
    }
  }

  lastClick = Date.now()
}

function mouseHoldExtended(e, scroll, slide, dragMouseDown, magMouseMove) {
  if (e.buttons == 2) {
    scroll.remove()
    initialized = false
    resizeObserver.unobserve(body)

    slide.removeEventListener("mousedown", dragMouseDown)
    document.removeEventListener("mousemove", magMouseMove)

    slide.removeEventListener("wheel", slideWheelExtra)
    body.removeEventListener("wheel", bodyWheelExtra)
    slide.removeEventListener("contextmenu", slideRightExtra)
    slide.removeEventListener("auxclick", slideMiddleExtra)
  }
}

function mouseUpExtended(id) {
  clearTimeout(id)
}

let slideWheelExtra
let bodyWheelExtra
let slideRightExtra
let slideMiddleExtra

const extra = (scroll, slide) => {

  slideWheelExtra = (event) => {
    event.preventDefault();

    let dir = event.deltaY > 0 ? 1 : -1
    let step = window.innerHeight - convertEmToPixel(scroll, 4.5)
    step *= dir

    targetScroll = html.scrollTop + step
  }
  slide.addEventListener('wheel', slideWheelExtra, {passive: false})

  bodyWheelExtra = (event) => {
    if (hideScroll && !slide.matches(':hover')) {
      event.preventDefault();

      let dir = event.deltaY > 0 ? 1 : -1
      let step = convertEmToPixel(scroll, 9)
      step *= dir

      targetScroll = html.scrollTop + step
    }
  }
  body.addEventListener('wheel', bodyWheelExtra, {passive: false})

  slideRightExtra = (event) => {
    event.preventDefault()

    targetScroll = 0
  }
  slide.addEventListener('contextmenu', slideRightExtra)

  slideMiddleExtra = (event) => {
    if (e.button == 1) {
      targetScroll = body.scrollHeight
    }
  }
  slide.addEventListener('auxclick', slideMiddleExtra)

}