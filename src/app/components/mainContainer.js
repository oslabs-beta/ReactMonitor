import React, { Component } from 'react';
import D3Tree from './d3tree';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello from MainContainer</h1>
        <D3Tree name={this.props.name} children={this.props.children} />
      </div>
    );
  }
}
