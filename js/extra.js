
function extended() {

}

slide.onwheel = (event) => {
  event.preventDefault();

  let dir = event.deltaY > 0 ? 1 : -1
  let step = window.innerHeight - convertRemToPixel(4.5)
  step *= dir

  html.scrollTop = html.scrollTop + step
}

slide.addEventListener('contextmenu', (event) => {
  event.preventDefault()

  if (window.getComputedStyle(body).overflowY == 'hidden') {
    document.body.style.overflowY = 'auto'
  } else {
    document.body.style.overflowY = 'hidden'
  }
})
