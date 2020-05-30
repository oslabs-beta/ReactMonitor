import React, { Component } from 'react';
import D3Tree from './D3Tree';

export default class TreeWrapper extends Component {
  componentDidMount() {
    this.setState({
      tree: new D3Tree(this.refs.tree),
    });
  }

  render() {
    return <div ref="tree"></div>;
  }
}
