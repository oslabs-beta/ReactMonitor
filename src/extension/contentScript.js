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
  for (let i = 0; i < file.length; i++) {
    const s0 = document.createElement("script"); //<script type= 'text/javascript' src= 'packag'> consol.log("script injected")</script>

    s0.setAttribute("type", "text/javascript");
    s0.setAttribute("src", chrome.extension.getURL(file[i]));
    // console.log(chrome.extension.getURL(file[0]), "injectedfile");
    body0.appendChild(s0);
  }
}
/*
... this will inject the following HTML into index.html:
<script type='text/javascript' src="package/newNode.js">`console.log("script injected!!");console.log("yes, script injected");
    const car = "toyota"`;</script>
    
1st type:
    <script src="..."></script>

2nd type:
<script>
.... javascript instructions ...
</scipt>

s0.innerText = `console.log("script injected!!");
    console.log("yes, script injected");
    const car = "toyota";
`

*/

setTimeout(() => {
  injectScript(["/test.js", "/fiberTreeAnalyzer.js"], "body");
}, 1000);

//what is the script element that will be injected to the HTML

// let tree = document.querySelector("#root");
// let test0 = tree._reactRootContainer._internalRoot.current.alternate.tag;
