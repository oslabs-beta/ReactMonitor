import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import createTree from './createTree';
import TicTacToe from '../mockData/ticTacToe'

let container;
let treeGraph;
  
describe('test treeGraph', () => {
  
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(<TicTacToe />, container);
    });

    treeGraph = createTree(container);
  })

 
  afterAll(() => {
    document.body.removeChild(container);
    container = null;
  });     

  it("Test if 3 row elements are created on the page", () => {

    expect(treeGraph.children[0].children[1].children.length).toBe(3); 
  });

  it("Test if the third row also has 3 elements (buttons)", () => {
    expect(treeGraph.children[0].children[1].children[0].children.length).toBe(3); 
  });
})

    expect(treeGraph.children[0].children[1].children.length).toBe(3); 
  });

  it("Test if the third row also has 3 elements (buttons)", () => {
    expect(treeGraph.children[0].children[1].children[0].children.length).toBe(3); 
  });
})




it('test treeGraph', () => {
  act(() => {
    console.log('container -', container);
    ReactDOM.render(<App />, container);
  });

  const treeGraph = createTree(container);
});
