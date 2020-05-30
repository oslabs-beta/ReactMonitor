import React from 'react';
import ReactDOM from 'react-dom';
import TreeWrapper from './components/TreeWrapper';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Playground</h1>
        <TreeWrapper />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
