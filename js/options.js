
const options = {
  dragMultiplier: 2.5
}

function saveOptions() {
  browser.storage.local.set({
    options: {
      dragMultiplier: document.querySelector("#drag-multiplier").value
    }
  })
}

function getOptions() {

  function copyOptions(result) {
    Object.assign(options, result)
  }

  function onError(error) {
    console.log(`Error: ${error}`)
  }

  browser.storage.local.get().then(copyOptions, onError)
}

document.addEventListener("load", getOptions)
