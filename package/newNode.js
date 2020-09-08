const JSONStringify = require('./JSONStringify');

function Node(name, parent, children, fiber) {
  console.log(' fiber.actualDuration hi',fiber.actualDuration)
  console.log(' fiber.actualStartTime hi',fiber.actualStartTime)
      this.name = name;
      this.parent = parent;
      this.value = Number(fiber.actualDuration.toFixed(2));
      this.children = children;
      this.stats = {
        state: JSON.stringify((fiber.memoizedState)?( (fiber.memoizedState.memoizedState)?fiber.memoizedState.memoizedState: fiber.memoizedState):fiber.memoizedState ),
        props: JSONStringify(fiber.memoizedProps),
        effectTag: fiber.effectTag,
        type: typeof fiber.type,
        renderStart: fiber.actualStartTime.toFixed(2),
        renderTotal: fiber.actualDuration.toFixed(2),
      };
      this.nodeSvgShape = {
        shape: 'ellipse',
        shapeProps: {
          rx: 10,
          ry: 10,
          fill: 'lightgreen',
        },
      };
      if (typeof this.type === "string") {
        this.type = fiber.type;
      }
      this.tag = fiber.tag;
  
  }

  module.exports = {
    Node: Node
  }
