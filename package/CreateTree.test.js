import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import chronoscope from 'react-chronoscope';
import createTree from './createTree';

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

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('test chronoscope', () => {

    act(() =>{
      console.log("container -", container);
      ReactDOM.render(<App />, container);
    });

    const treeGraph = createTree(container);
    console.log("treeGraph -", treeGraph);

    expect(container.innerHTML).toBe('<p>Hello</p><button>Click me</button>')
});



