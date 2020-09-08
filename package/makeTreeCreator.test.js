const makeTreeCreator = require('./makeTreeCreator');
const fiber = require('../mockData/fiber');


describe('test makeTreeCreator', () => {


  xit('test makeTreeCreator returns a function', () => {

    const treeCreator = makeTreeCreator();
    const treeGraph = treeCreator(fiber);

    expect( treeCreator ).toBeInstanceOf( Function )
    expect( treeGraph.name ).toBe('div');
  });

  xit('test makeTreeCreator has valid value', () => {

    const treeCreator = makeTreeCreator();
    const treeGraph = treeCreator(fiber);

    expect( treeGraph.name ).toBe('div');
  });


});
