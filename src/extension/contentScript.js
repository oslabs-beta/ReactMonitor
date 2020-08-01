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
  const s0 = document.createElement("script"); //<script type= 'text/javascript' src= ''> consol.log("script injected")</script>

  s0.setAttribute("type", "text/javascript");
  s0.setAttribute("src", chrome.extension.getURL(file));
  // console.log(chrome.extension.getURL(file[0]), "injectedfile");
  s0.innerText = `
		console.log("script injected!!");
		let tree = document.querySelector("#root");
		let test0 = tree._reactRootContainer._internalRoot
			.current.alternate.tag;
		console.log(test0);
	`;
  body0.appendChild(s0);
}

setTimeout(() => {
  injectScript("/test.js", "body");
}, 1000);

//what is the script element that will be injected to the HTML
