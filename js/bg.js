
function reloadExtension() {
  browser.runtime.reload();
}

browser.commands.onCommand.addListener(function (command) {
  if (command == "double-refresh") {
    reloadExtension();
    browser.tabs.query(
      { currentWindow: true, active: true },
      function (tabArray) {
        browser.tabs.sendMessage(
          tabArray[0].id,
          { event: "reloadPage" }
        );
      }
    );
  }
});


function onError(error) {
  console.log(`Error: ${error}`)
}

function onGot(item) {
  console.log(item)
}

browser.storage.local.get().then(onGot, onError)
