
function deleteParent(root){

  console.log("*** deleteParent function ****")
  if (root.parent) {
    console.log("**** deleting root.Parent *****");
    delete root.parent;
  }
  if (root.children) {
    root.children.forEach((child) => deleteParent(child));
  }

}



module.exports = deleteParent;