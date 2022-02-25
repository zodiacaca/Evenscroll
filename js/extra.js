
// wheel
let targetScroll = 0
let hideScroll = false

function extended() {
  if ((hideScroll || slide.matches(':hover')) && !isMDown) {
    html.scrollTop = lerp(0.1, html.scrollTop, targetScroll)
  } else {
    targetScroll = html.scrollTop
  }
}

slide.onwheel = (event) => {
  event.preventDefault();

  let dir = event.deltaY > 0 ? 1 : -1
  let step = window.innerHeight - convertEmToPixel(4.5)
  step *= dir

  targetScroll = html.scrollTop + step
}

body.addEventListener('wheel', (event) => {
  if (hideScroll && !slide.matches(':hover')) {
    event.preventDefault();

    let dir = event.deltaY > 0 ? 1 : -1
    let step = convertEmToPixel(9)
    step *= dir

    targetScroll = html.scrollTop + step
  }
}, {passive: false})

slide.addEventListener('contextmenu', (event) => {
  event.preventDefault()

  if (hideScroll) {
    document.body.style.overflowY = 'auto'
    hideScroll = false
  } else {
    document.body.style.overflowY = 'hidden'
    hideScroll = true
  }
})

// extra space
slide.addEventListener('auxclick', function(e) {
  if (e.button == 1) {
    const blank = document.createElement("div")
    blank.setAttribute("class", "blank")
    body.appendChild(blank)
  }
})
