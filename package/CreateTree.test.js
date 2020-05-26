import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import chronoscope from 'react-chronoscope';
import createTree from './createTree';
import TicTacToe from '../mockData/ticTacToe'

  function Dialog({children}){
    return(
      <div>
        <p>Hello</p>
        {children}
      </div>
    )
  }
  function Button({children}){
    return (
      <button>
      {children}
      </button>
    )
  }
  class App extends React.Component{
    render() {
      return (
        <div>
          <Dialog>
            <Button>
              Click me
            </Button>
          </Dialog>
        </div>
      )

    }
  }
  
  let container;
  let treeGraph;
  
  describe('test treeGraph', () => {
    
    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
      ReactDOM.render(<TicTacToe />, container);
      console.log("container -", container);
      // console.log("treeGraph -", JSON.stringify(treeGraph));
      });
    treeGraph = createTree(container);
    })


    // beforeEach(() => {
      //   container = document.createElement('div');
      //   document.body.appendChild(container);
      // });
      
    afterAll(() => {
      document.body.removeChild(container);
      container = null;
    });     
    it("Test if 3 row elements are created on the page", () => {
      // console.log('inside first it treegraph: ', treeGraph)
      expect(treeGraph.children[0].children[1].children.length).toBe(3); // ==> 3 (number of Rows)
    });
    it("Test if the third row also has 3 elements (buttons)", () => {
      expect(treeGraph.children[0].children[1].children[0].children.length).toBe(3); // ==> 3 (number of Bixes in the row)
    });
  })
    // expect(container.innerHTML).toBe('<div><div><p>Hello</p><button>Click me</button></div></div>')


      // console.log('inside first it treegraph: ', treeGraph)
      expect(treeGraph.children[0].children[1].children.length).toBe(3); // ==> 3 (number of Rows)
    });
    it("Test if the third row also has 3 elements (buttons)", () => {
      expect(treeGraph.children[0].children[1].children[0].children.length).toBe(3); // ==> 3 (number of Bixes in the row)
    });
  })
    // expect(container.innerHTML).toBe('<div><div><p>Hello</p><button>Click me</button></div></div>')





