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

//funtion to inject the script(s) to user application's context
// function injectScript(file, node) {
//   const th = document.getElementsByTagName(node)[0];
//   const s = document.createElement("script");
//   s.setAttribute("type", "text/javascript");
//   s.setAttribute("src", file);
//   th.appendChild(s);
// }

// chrome.runtime.onMessage.addListener(() => {
//   const newEvent = new Event("reactmonitor");
//   window.dispatchEvent(newEvent);
// });

// setTimeout(() => {
//   injectScript(chrome.runtime.getURL(web_accessible_resources), "body");
// }, 5000);
