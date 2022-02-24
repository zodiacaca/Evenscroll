
const b = typeof browser !== 'undefined' ? browser : chrome

function reloadExtension() {
  b.runtime.reload();
}

b.commands.onCommand.addListener(function (command) {
  if (command == "double-refresh") {
    reloadExtension();
    b.tabs.query(
      { currentWindow: true, active: true },
      function (tabArray) {
        b.tabs.sendMessage(
          tabArray[0].id,
          { event: "reloadPage" }
        );
      }
    );
  }
});
