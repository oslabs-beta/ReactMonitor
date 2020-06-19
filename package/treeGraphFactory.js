 const { Node } = require('./newNode');
 
 let i = 1;
 // helper function - that accepts the node - Host Root
 module.exports = function (fiber){

    // create a treeGraph
    const treeGraph = new Node(fiber.type.name, null, [], fiber); // Represent the top most Element (like App);
    const helper = (fiber, treeGraph) => {
      // check if fiber.child !== null - traverse
      if (fiber.child) {
        // push the new Node to the treeGraph.children array
        // the parent will the tree graph we are currently working with
        // (do the type check for elements that are functions or html elements)
        let newGraphNode = treeGraph;
        if (
          typeof fiber.child.type !== 'object'
          && (fiber.child.child ? typeof fiber.child.child.type !== 'object' : true)
        ) {
          newGraphNode = new Node(
            fiber.child.key
            || (fiber.child.type ? fiber.child.type.name : fiber.child.type)
            || fiber.child.type,
            treeGraph, [], fiber.child
          );
          treeGraph.children.push(newGraphNode);
        }
        // recursively invoke the helper on child
        helper(fiber.child, newGraphNode);
      }
      // check if fiber.sibling !== null - traverse
      if (fiber.sibling) {
        let newGraphNode = treeGraph;
        if (
          typeof fiber.sibling.type !== 'object'
          && (fiber.sibling.child ? typeof fiber.sibling.child.type !== 'object' : true)
        ) {
          // create new GraphNode based on it with parent being a treeGraph.parent
          newGraphNode = new Node(
            fiber.sibling.key
            || (fiber.sibling.type ? fiber.sibling.type.name : fiber.sibling.type)
            || fiber.sibling.type,
            treeGraph.parent, [], fiber.sibling
          );
          // push the node on to the treeGraph.parent.children array
          treeGraph.parent.children.push(newGraphNode);
        }
        helper(fiber.sibling, newGraphNode);
      }
      // name of the element can be found in child.type.name
    };
    // invoke the helper function
    helper(fiber, treeGraph); // fiber is an App Fiber
    console.log("treeGraphFactory =", treeGraph);
    return treeGraph;
  }
