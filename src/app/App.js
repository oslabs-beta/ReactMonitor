import React, { Component } from 'react';
import { render } from 'react-dom';
import MainContainer from './components/mainContainer';

let port;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      children: [],
    };
  }

  componentDidMount() {
    if (!port) port = chrome.runtime.connect();
    port.onMessage.addListener((message) => {
      console.log('didmountmessage: ', message);
      this.setState({
        name: message.payload.payload.name,
        children: message.payload.payload.children,
      });
    });
  }

  componentDidUpdate() {
    if (!port) port = chrome.runtime.connect();
    port.onMessage.addListener((message) => {
      console.log('didupdatemessage: ', message);
      this.setState({
        name: message.payload.payload.name,
        children: message.payload.payload.children,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>Hello From APPJS</h1>
        <MainContainer name={this.state.name} children={this.state.children} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
