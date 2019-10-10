let elements = document.getElementsByTagName('*');
let totalChanges = 0;

for (let i = 0; i < elements.length; i++) {
  let element = elements[i];
  
  // iterate through child nodes
  for(let j = 0; j < element.childNodes.length; j++) {
    let node = element.childNodes[j];

    if (node.nodeType === 3) {
      let text = node.nodeValue;
      let changedText = text.replace(/illegal alien|illegal aliens|illegals|illegal immigrant|illegal immigrants/gi, '<span style="background-color: #FFFF00;">undocumented immigrant</span>');
      
      if (changedText !== text) {
	let newNode = document.createElement("span");
	newNode.innerHTML = changedText;
	element.replaceChild(newNode, node);
	totalChanges++;
      }
    }
  }
}
const grade = totalChanges > 0 ? 'F' : 'A';
let message = `No Human Being is Illegal\n\nTotal changes to be made: ${totalChanges}\n This webpage has a grade of: ${grade}`;
alert(message);

