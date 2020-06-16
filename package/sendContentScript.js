const treeCreator = require('./treeCreator');

module.exports = function (prevTree, currentTree){
      // do this on first load
      if (currentTree === undefined){
        const treeGraph = treeCreator(prevTree);
        window.postMessage({ action: 'npmToContent', payload: treeGraph });
      // if any changes between current DOM and Virtual DOM 
      }else if (prevTree !== currentTree) {
        const treeGraph = treeCreator(currentTree);
        window.postMessage({ action: 'npmToContent', payload: treeGraph });
      }
}