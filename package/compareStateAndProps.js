function compareStateAndProps(wasMounted, node, prevNode, parentShapeProps) {
  // compare state and props properties on stats properties for both nodes
  // if same - treeGraph.stats.stateOrPropsChanged - false
  if (node && prevNode) {
    // check if the node's type is a string
    // yes? give it a color of the parent - because Composite Component renders(or not) Host Component
    if (node.stats.type === 'string') {
      node.nodeSvgShape.shapeProps = parentShapeProps;
      delete node.stats.state;
      delete node.stats.props;
    } else if (
      prevNode.stats.state === node.stats.state &&
      prevNode.stats.props === node.stats.props
    ) {
      if (
        (node.stats.effectTag === 0 || node.stats.effectTag === 4) &&
        wasMounted
      ) {
        node.nodeSvgShape.shapeProps.fill = 'gray';
      } else {
        node.nodeSvgShape.shapeProps.fill = 'red';
        node.nodeSvgShape.shapeProps.rx = 12;
        node.nodeSvgShape.shapeProps.ry = 12;
      }
    }

    // delete node.stats;

    // recursively invoke the function for each children
    if (node.children.length) {
      for (let i = 0; i < node.children.length; i += 1) {
        compareStateAndProps(
          wasMounted,
          node.children[i],
          prevNode.children[i],
          node.nodeSvgShape.shapeProps
        );
      }
    }
  } else if (node) {
    // delete node.stats;
    if (node.stats.type === 'string') {
      delete node.stats.state;
      delete node.stats.props;
    }

    // recursively invoke the function for each children
    if (node.children.length) {
      for (let i = 0; i < node.children.length; i += 1) {
        compareStateAndProps(
          wasMounted,
          node.children[i],
          null,
          node.nodeSvgShape.shapeProps
        );
      }
    }
  }

  if (!wasMounted) {
    // delete node.stats;
    if (node.stats.type === 'string') {
      delete node.stats.state;
      delete node.stats.props;
    }
    if (node.children.length) {
      for (let i = 0; i < node.children.length; i += 1) {
        compareStateAndProps(wasMounted, node.children[i]);
      }
    }
  }
};


module.exports = compareStateAndProps;

