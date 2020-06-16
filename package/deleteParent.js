export default function deleteParent(root) {
    if (root.parent) {
      delete root.parent;
    }
    if (root.children) {
      root.children.forEach((child) => deleteParent(child));
    }
}