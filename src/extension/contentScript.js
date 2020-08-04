// listen for message from npm package
window.addEventListener("message", (msg) => {
  // filter the incoming msg.data
  if (msg.data.action === "npmToContent") {
    // send the message to the chrome - backgroundScript
    chrome.runtime.sendMessage({
      action: "ContentToBackground",
      payload: msg.data,
    });
  }
});

function injectScript(file, node) {
  // test - inject javascript, access fibergraph
  const body0 = document.getElementsByTagName(node)[0];

  // iterating the file from web accessible resources
  for (let i = 0; i < file.length; i++) {
    const s0 = document.createElement("script"); //<script type= 'text/javascript' src= 'packag'> consol.log("script injected")</script>

    s0.setAttribute("type", "text/javascript");

    //built in chrome method to get the path of the file to be injected to the user's app
    s0.setAttribute("src", chrome.extension.getURL(file[i]));
    // console.log(chrome.extension.getURL(file[0]), "injectedfile");
    body0.appendChild(s0);
  }
}
/*
... this will inject the following HTML tags into index.html:

<script type='text/javascript' src="/containerWrapper.js">

<script type='text/javascript' src="/fiberTreeAnalyzer.js">

*/

setTimeout(() => {
  injectScript(["/containerWrapper.js", "/fiberTreeAnalyzer.js"], "body");
}, 1000);
