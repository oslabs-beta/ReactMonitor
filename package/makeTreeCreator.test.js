const makeTreeCreator = require('./makeTreeCreator');
const fiber = require('../mockData/fiber');


describe('test makeTreeCreator', () => {


  it('test makeTreeCreator returns a function', () => {

    const treeCreator = makeTreeCreator();
    const treeGraph = treeCreator(fiber);

    expect( treeCreator ).toBeInstanceOf( Function )
    expect( treeGraph.name ).toBe('div');
  });

  it('test makeTreeCreator has valid value', () => {

    const treeCreator = makeTreeCreator();
    const treeGraph = treeCreator(fiber);

    expect( treeGraph.name ).toBe('div');
  });


});
