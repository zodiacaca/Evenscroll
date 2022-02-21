
const settings = {}

function onGot(result) {
  Object.assign(settings, result.options)

  if (settings.hideScrollbar) {
    document.querySelector("#option-hide").classList.add("selected")
  } else {
    document.querySelector("#option-auto").classList.add("selected")
  }
}

function onError(error) {
  console.log(`Error: ${error}`)
}

browser.storage.local.get().then(onGot, onError)

const options = document.getElementsByClassName("option")
Array.from(options).forEach((element) => {
  element.onclick = () => {
    Array.from(options).forEach((element) => {
      element.classList.remove("selected")
    })

    element.classList.add("selected")

    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {action: element.id}, function(response) {})
    })
  }
})
