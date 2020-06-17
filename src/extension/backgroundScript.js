// define a variable to store tree data structure from content script;
let treeGraph;
// connected port will be saved here
let currentPort;

// listen for connection from the chrome dev tool;
chrome.runtime.onConnect.addListener((port) => {
  // save the port
  currentPort = port;
  console.log('Currentport: ', port);
  // send message to Chrome Dev Tool on initial connect
  port.postMessage({
    payload: treeGraph,
  });
});

// listen for message from contentScript
chrome.runtime.onMessage.addListener((msg) => {
  // reassign the treeGraph
  treeGraph = msg.payload;
  console.log('TreeGraph within the onmessage.addListener: ', treeGraph);
  // once the message is accepted from content script, send it to dev tool
  if (currentPort) {
    currentPort.postMessage({
      payload: treeGraph,
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'reactmonitor',
    title: 'Reactmonitor',
    contexts: ['page', 'selection', 'image', 'link'],
  });
})



chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  const options = {
    type: 'panel',
    width: 960,
    height: window.screen.availHeight,
    url: chrome.runtime.getURL('index.html'),
  };
  if (menuItemId === 'reactmonitor') chrome.windows.create(options);
});
