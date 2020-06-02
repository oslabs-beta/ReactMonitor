import React, { Component } from 'react';
import TreeWrapper from './TreeWrapper';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello from MainContainer</h1>
        <TreeWrapper name={this.props.name} children={this.props.children} />
      </div>
    );
  }
}
