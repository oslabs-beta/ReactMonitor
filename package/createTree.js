const sendContentScript = require("./sendContentScript");

//this function will be invoked in containerWrapper.js

module.exports = function (container) {
	const fiberRoot = container._reactRootContainer._internalRoot;
	let hostRoot = fiberRoot.current;
  	const treeCreator = require("./makeTreeCreator")();
	let time_last = -Infinity;
	// console.log("[info] actualStartTime:", hostRoot);
	
	setInterval( function() {
		hostRoot = fiberRoot.current;
		if (hostRoot.actualStartTime !== time_last) {
			sendContentScript( treeCreator, undefined, hostRoot);
			time_last = hostRoot.actualStartTime;
			console.log("[2] actualStartTime:", time_last);
			console.log("[2] actualStartTime:", hostRoot.actualStartTime);
		}
	}, 100 );
	
};
