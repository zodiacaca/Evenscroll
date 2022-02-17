
const options = {
  dragMultiplier: 2.5
}

function saveOptions() {
  browser.storage.local.set({
    options: {
      dragMultiplier: document.querySelector("#drag-value").value
    }
  })
}

function getOptions() {

  function copyOptions(result) {
    Object.assign(options, result.options)

    document.querySelector("#drag-range").value = options.dragMultiplier * 10
    document.querySelector("#drag-value").value = options.dragMultiplier
  }

  function onError(error) {
    console.log(`Error: ${error}`)
  }

  browser.storage.local.get().then(copyOptions, onError)
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
