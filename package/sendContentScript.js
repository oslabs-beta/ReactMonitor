module.exports = function(treeCreator, prevTree, currentTree)
{
	const treeGraph = treeCreator(currentTree);
	window.postMessage({ action: 'npmToContent', payload: treeGraph });
}
