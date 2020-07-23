// listen for message from npm package
window.addEventListener('message', (msg) => {
  // filter the incoming msg.data
  if (msg.data.action === 'npmToContent') {
    // send the message to the chrome - backgroundScript
    chrome.runtime.sendMessage({
      action: 'ContentToBackground',
      payload: msg.data,
    });
  }
});
