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
    console.log('THIS IS MOUNTING ALL THE TIME')
    if (!port) port = chrome.runtime.connect();

    port.onMessage.addListener((message) => {
<<<<<<< HEAD
      console.log('didmountmessage: ', message);
=======
      console.log('message', message);
>>>>>>> 9a6a88d1d338a608a07b4aa854e7f8a54c830d96
      this.setState({
        name: message.payload.payload.name,
        children: message.payload.payload.children,
        stats: message.payload.payload.stats,
      });
    });
  }
<<<<<<< HEAD

  // componentDidUpdate() {
  //   if (!port) port = chrome.runtime.connect();
  //   port.onMessage.addListener((message) => {
  //     console.log('didupdatemessage: ', message);
  //     this.setState({
  //       name: message.payload.payload.name,
  //       children: message.payload.payload.children,
  //       stats: message.payload.payload.stats,
  //     });
  //   });
  // }
=======
>>>>>>> 9a6a88d1d338a608a07b4aa854e7f8a54c830d96

  render() {
    return (
      <div>
        <MainContainer stats={this.state.stats} name={this.state.name} children={this.state.children} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
