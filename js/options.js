
const b = typeof browser !== 'undefined' ? browser : chrome

const options = {
  dragMultiplier: 2.5,
  hideScrollbar: false
}

function saveOptions() {
  b.storage.local.set({
    options: {
      dragMultiplier: document.querySelector("#drag-value").value,
      hideScrollbar: document.querySelector("#hide-check").checked
    }
  })
}

function getOptions() {

  function onGot(result) {
    Object.assign(options, result.options)

    document.querySelector("#drag-range").value = options.dragMultiplier * 10
    document.querySelector("#drag-value").value = options.dragMultiplier
    document.querySelector("#hide-check").checked = options.hideScrollbar
  }

  b.storage.local.get(options, onGot)
}

window.addEventListener('load', getOptions)

document.querySelector('#save').onclick = () => {
  saveOptions()
}

// gadgets
document.querySelector("#drag-range").oninput = (e) => {
  let value = e.target.value
  value = parseInt(value, 10) * 0.1
  value = value.toPrecision(2)
  e.target.nextElementSibling.value = value
}
