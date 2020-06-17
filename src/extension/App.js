import React, { Component } from 'react';
import { render } from 'react-dom';
import MainContainer from '../app/components/mainContainer';
import './style.scss';

let port;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      children: [],
      stats: '',
      value: 0
    };
  }

  componentDidMount() {
    if (!port) port = chrome.runtime.connect();

    port.onMessage.addListener((message) => {
      console.log('message', message);
      this.setState({
        value: message.payload.payload.value,
        name: message.payload.payload.name,
        children: message.payload.payload.children,
        stats: message.payload.payload.stats,
      });
    });
  }

  render() {
    return (
      <div>
        <MainContainer
          value={this.state.value}
          name={this.state.name}
          children={this.state.children}
          stats={this.state.stats}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
