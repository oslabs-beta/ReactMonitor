const treeGraph = require('../mockData/treeGraph');
const deleteParent = require('./deleteParent');


describe('test deleteParent', () => {


  xit('test deleteParent deletes Parents', () => {

    const prunedTreeGraph = deleteParent(treeGraph);

    console.log("prunedTreeGraph -", prunedTreeGraph);
    expect(prunedTreeGraph.name).toBe('h1');
    expect(prunedTreeGraph.value).toBe(9);
    expect(prunedTreeGraph.tag).toBe(5);
    expect(prunedTreeGraph.stats.effectTag).toBe(1);
    expect(prunedTreeGraph.stats.renderStart).toBe('400.00');
    expect(prunedTreeGraph.stats.renderTotal).toBe('9.00');
    expect(prunedTreeGraph.children[0].name).toBe('div');
    expect(prunedTreeGraph.children[0].value).toBe(8);
    expect(prunedTreeGraph.children[0].tag).toBe(1);
    expect(prunedTreeGraph.children[0].stats.effectTag).toBe(2)
  });


});
