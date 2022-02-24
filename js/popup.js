
const b = typeof browser !== 'undefined' ? browser : chrome

const settings = {
  dragMultiplier: 2.5,
  hideScrollbar: false
}

function onGot(result) {
  Object.assign(settings, result.options)

  if (settings.hideScrollbar) {
    document.querySelector("#hide").classList.add("selected")
  } else {
    document.querySelector("#auto").classList.add("selected")
  }
}

b.storage.local.get(settings, onGot)

const options = document.getElementsByClassName("option")
Array.from(options).forEach((element) => {
  element.onclick = () => {
    Array.from(options).forEach((element) => {
      element.classList.remove("selected")
    })

    element.classList.add("selected")

    b.tabs.query({active: true, currentWindow: true}, function(tabs) {
      b.tabs.sendMessage(tabs[0].id, {action: element.id}, function(response) {})
    })
  }
})
