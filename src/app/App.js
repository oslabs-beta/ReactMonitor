import React, { Component } from 'react';
import { render } from 'react-dom';
import MainContainer from './components/mainContainer';
import './style.scss';

let port;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      children: [],
      stats: '',
    };
  }

  componentDidMount() {
    if (!port) port = chrome.runtime.connect();
    port.onMessage.addListener((message) => {
      console.log('message', message);
      this.setState({
        name: message.payload.payload.name,
        children: message.payload.payload.children,
        stats: message.payload.payload.stats,
      });
    });
  }

  render() {
    return (
      <div>
        <MainContainer stats={this.state.stats} name={this.state.name} children={this.state.children} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
