const fiber = require('../mockData/fiber');
const treeGraphFactory = require('./treeGraphFactory');


describe('test treeGraphFactory', () => {

  it('test treeGraph was created properly', () => {
    
    const treeGraph = treeGraphFactory(fiber);
    expect(treeGraph.name).toBe('h1');
    expect(treeGraph.value).toBe(9);
    expect(treeGraph.tag).toBe(5);
    expect(treeGraph.stats.effectTag).toBe(1);
    expect(treeGraph.stats.renderStart).toBe('400.00');
    expect(treeGraph.stats.renderTotal).toBe('9.00');
    expect(treeGraph.children[0].name).toBe('div');
    expect(treeGraph.children[0].value).toBe(8);
    expect(treeGraph.children[0].tag).toBe(1);
    expect(treeGraph.children[0].stats.effectTag).toBe(2)
  });
});
