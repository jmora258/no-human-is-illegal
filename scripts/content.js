// 1. Listen for request from Extension 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
  // 2. Process request 
    if (request.action == "AbolishICE") {
      let elements = document.getElementsByTagName('*');
      let totalChanges = 0;

      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];

        // 3. Iterate through child nodes and implement changes
        for(let j = 0; j < element.childNodes.length; j++) {
          let node = element.childNodes[j];

          if (node.nodeType === 3) {
            let text = node.nodeValue;
            let changedText = text.replace(/illegal alien|illegal aliens|illegals|illegal immigrant|illegal immigrants/gi, '<span class="highlight-me" style="">undocumented immigrant</span>');
            
            if (changedText !== text) {
              let newNode = document.createElement("span");
              newNode.innerHTML = changedText;
              element.replaceChild(newNode, node);
              totalChanges++;
            }
          }
        }
      }
      const grade = totalChanges > 0 ? 'F-' : 'A';

      // 4. Send data back to extension
      sendResponse({data: [totalChanges, grade]});
    }
});