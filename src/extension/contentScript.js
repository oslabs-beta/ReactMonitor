// listen for message from npm package
window.addEventListener('message', (msg) => {
  // filter the incoming msg.data
  if (msg.data.action === 'npmToContent') {
	console.log("fiber to ext:", msg.data );
    // send the message to the chrome - backgroundScript
    chrome.runtime.sendMessage({
      action: 'ContentToBackground',
      payload: msg.data,
    });
  }
});
window.setTimeout( function() {
	// test - inject javascript, access fibergraph
	const body0 = document.body;
	const s0 = document.createElement('script');
	s0.setAttribute('type', 'text/javascript');
	s0.innerText = `
		console.log("script injected!!");
		let tree = document.querySelector("#container");
		let test0 = tree._reactRootContainer._internalRoot
			.current.alternate.tag;
		console.log(test0);
	`;
	body0.appendChild(s0);
}, 1000 );
