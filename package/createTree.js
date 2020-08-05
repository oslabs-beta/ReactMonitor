const sendContentScript = require("./sendContentScript");

//this function will be invoked in containerWrapper.js

module.exports = function (container) {

	console.log("***IN CREATE TREE***");
	console.log("*** container ***", container );
	const fiberRoot = container._reactRootContainer._internalRoot;
	console.log("*** fiberroot ***", fiberRoot );
	let hostRoot = fiberRoot.current;
  	const treeCreator = require("./makeTreeCreator")();
	let time_last = -Infinity;
	console.log("[info] actualStartTime:", hostRoot.actualStartTime);
	
	setInterval( function() {
		hostRoot = fiberRoot.current;
		if (hostRoot.actualStartTime != time_last) {
		console.log(
			"[info] actualStartTime:", hostRoot.actualStartTime);
//			sendContentScript(
//				treeCreator, hostRoot, fiberRoot.current
//	      	);
			sendContentScript(
				treeCreator, undefined, hostRoot
	      	);
			time_last = hostRoot.actualStartTime;
		}
	}, 100 );
/*
  // on first load use initial render.
  window.addEventListener("load", () => {
    console.log("LOAD");
    sendContentScript(treeCreator, hostRoot);
  });

  window.addEventListener("click", () => {
    setTimeout(() => {
      console.log("CLICK");
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
      hostRoot=fiberRoot.current// to prevent none changing clicks from afecting the tree graph
    }, 200);
  });

  window.addEventListener("keyup", () => {
    setTimeout(() => {
      console.log("KEYUP");
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
      hostRoot=fiberRoot.current// to prevent none changing clicks from afecting the tree graph
    }, 200);
  });
*/
};
