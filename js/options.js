
const options = {
  dragMultiplier: 2.5
}

function saveOptions() {
  browser.storage.local.set({
    options: {
      dragMultiplier: document.querySelector("#drag-range").value * 0.1
    }
  })
}

function getOptions() {

  function copyOptions(result) {
    Object.assign(options, result.options)
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
