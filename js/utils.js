
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max)
}

function lerp(t, from, to) {
  return from + (to - from) * t
}

function convertRemToPixel(rem) {
  return rem * parseFloat(getComputedStyle(html).fontSize)
}

function getClientOffset(elem) {
  let top = 0, left = 0
  while(elem) {
      top = top + parseFloat(elem.offsetTop)
      left = left + parseFloat(elem.offsetLeft)
      elem = elem.offsetParent
  }

  return {top: top, left: left}
}
