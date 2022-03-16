
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

function mouseDownExtended() {
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

const extra = (scroll, slide) => {

  slide.onwheel = (event) => {
    event.preventDefault();

    let dir = event.deltaY > 0 ? 1 : -1
    let step = window.innerHeight - convertEmToPixel(scroll, 4.5)
    step *= dir

    targetScroll = html.scrollTop + step
  }

  body.addEventListener('wheel', (event) => {
    if (hideScroll && !slide.matches(':hover')) {
      event.preventDefault();

      let dir = event.deltaY > 0 ? 1 : -1
      let step = convertEmToPixel(scroll, 9)
      step *= dir

      targetScroll = html.scrollTop + step
    }
  }, {passive: false})

  slide.addEventListener('contextmenu', (event) => {
    event.preventDefault()

    targetScroll = 0
  })

  slide.addEventListener('auxclick', function(e) {
    if (e.button == 1) {
      targetScroll = body.scrollHeight
    }
  })

}