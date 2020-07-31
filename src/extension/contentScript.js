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
  const s0 = document.createElement("script");
  s0.setAttribute("type", "text/javascript");
  s0.setAttribute("src", file);
  console.log("Injected");
  s0.innerText = `
		console.log("script injected!!");
		let tree = document.querySelector("#container");
		let test0 = tree._reactRootContainer._internalRoot
			.current.alternate.tag;
		console.log(test0);
	`;
  body0.appendChild(s0);
}

setTimeout(() => {
  injectScript(chrome.runtime.getURL("/newNode.js"), "body");
}, 1000);
