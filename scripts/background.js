let pageMessage = "";

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('results').textContent = "Extension loaded";

  const button = document.getElementById("getResults");
  button.addEventListener('click', function () {
    console.log("test storage is: " + pageMessage);
    $("#results").html(pageMessage);
    console.log("inside button listener")
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    pageMessage = request.msg;
    if (pageMessage) {
      console.log("message received..." + pageMessage);
    }
});