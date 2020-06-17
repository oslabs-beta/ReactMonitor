const treeGraphFactory = require('./treeGraphFactory');
const deleteParent = require('./deleteParent');
const compareStateAndProps = require('./compareStateAndProps');


module.exports = function (){

  // first time load these closure variables
  // need to be initialized accordingly.
  let wasMounted = false;
  let prevTreeGraph = null;

  return treeCreator;

  function treeCreator(hostRoot, treeGraph = null) {

    console.log("prevTreeGraph -", prevTreeGraph);
    // 1.) create treeGraph
    if (hostRoot.child) {
      // recursively traverse App Fiber Tree and create treeGraph
      treeGraph = treeGraphFactory(hostRoot.child);
    }
  
    // 2.) prune treeGraph
    deleteParent(treeGraph);
    delete treeGraph.parent;
  
    // 3.) enhance treeGraph 
    // by comparing state and props in prevTreeGraph and treeGraph(current)
    const tempTreeGraph = JSON.parse(JSON.stringify(treeGraph));
    compareStateAndProps(wasMounted, treeGraph, prevTreeGraph, null);
    prevTreeGraph = tempTreeGraph;
    wasMounted = true;
  
  
    return treeGraph;
  
  }
}
