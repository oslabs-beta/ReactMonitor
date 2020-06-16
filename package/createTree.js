const sendContentScript = require('./sendContentScript');

module.exports = function (container) {
  const fiberRoot = container._reactRootContainer._internalRoot;
  const hostRoot = fiberRoot.current;

  // on first load use initial render.
  window.addEventListener('load', () => sendContentScript(hostRoot))

  window.addEventListener('click', () => {
    setTimeout(() => {
      sendContentScript(hostRoot, fiberRoot.current);
    }, 200);
  });

  window.addEventListener('keyup', () => {
    setTimeout(() => {
      sendContentScript(hostRoot, fiberRoot.current);
    }, 200);
  });
};
