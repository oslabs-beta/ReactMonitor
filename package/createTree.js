const sendContentScript = require('./sendContentScript');
const makeTreeCreator = require('./makeTreeCreator');

module.exports = function (container) {
  const fiberRoot = container._reactRootContainer._internalRoot;
  const hostRoot = fiberRoot.current;
  const treeCreator = makeTreeCreator();

  // on first load use initial render.
  window.addEventListener('load', () => sendContentScript(hostRoot))

  window.addEventListener('click', () => {
    setTimeout(() => {
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
    }, 200);
  });

  window.addEventListener('keyup', () => {
    setTimeout(() => {
      sendContentScript(treeCreator, hostRoot, fiberRoot.current);
    }, 200);
  });
};
