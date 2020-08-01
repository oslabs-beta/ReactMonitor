const sendContentScript = require('./sendContentScript');
const makeTreeCreator = require('./makeTreeCreator');

module.exports = function (container) {
  const fiberRoot = container._reactRootContainer._internalRoot;
  let hostRoot = fiberRoot.current;
  const treeCreator = makeTreeCreator();

  // on first load use initial render.
  window.addEventListener('load', () => sendContentScript(treeCreator, hostRoot))

  window.addEventListener('click', () => {
    setTimeout(() => {
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
      hostRoot=fiberRoot.current// to prevent none changing clicks from afecting the tree graph
    }, 200);
  });

  window.addEventListener('keyup', () => {
    setTimeout(() => {
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
      hostRoot=fiberRoot.current// to prevent none changing clicks from afecting the tree graph
    }, 200);
  });
};
