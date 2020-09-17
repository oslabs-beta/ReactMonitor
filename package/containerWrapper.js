const reactMonitor = require("./createTree.js");

//grabbing the Dom element that has the property of react_RootContiner
function get_fiber_root(document_children) {
  for (let ele of document_children) {
    if (ele.hasOwnProperty("_reactRootContainer")) return ele;
  }
}

const container = get_fiber_root(document.body.children);

//invoking the createTree function by passing the DOM element that contain the property of react_RootContainer
reactMonitor(container);
