/* Google Analytics  
 */
  // Tracking ID: 
  var _AnalyticsCode = "UA-150392574-1";
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', _AnalyticsCode]);
  _gaq.push(['_trackPageview']);

  // Analytics Asynchronous Tracking Code: 
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

 // Track clicks on "get results" button
 function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

// 1. Establish connection with ACTIVE TAB 
// 2. Send request to CONTENT.js and execute code
// 3. Receive callback with data 
// 4. Display it on the Popup 
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('results').textContent = "Extension loaded";

  /* event handlers for the popup's 'Get Results' button */
  const resultsButton = document.getElementById("getResults");
  resultsButton.addEventListener('click', trackButtonClick);

  resultsButton.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "AbolishICE"}, function (response) {
        let message = `<p id="primary-message">Total changes made: <strong>${response.data[0]}</strong><br/>This page's grade is: <strong>${response.data[1]}</strong></p> <br/><p id="note">NOTE #1: Navigate to another page OR refresh the page to reset.<br/><br/>NOTE #2: If this page has any dynamic elements and/or social media plugins (Twitter or Facebook feeds), there is a chance that not all anti-immigrant/xenophobic terms were replaced.</p>`;

        $("#results").html(message);

        // no longer need button, remove it 
        $("#getResults").detach();
      });
    });
  });
});
