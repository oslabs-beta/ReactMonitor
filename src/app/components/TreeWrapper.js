import React, { Component } from 'react';
import D3Tree from './D3Tree';

let root;

export default class TreeWrapper extends Component {
  constructor(props) {
    super(props);
    this.treeRef = React.createRef();
  }

  componentDidMount() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree();
  }

  componentDidUpdate() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree();
  }

  render() {
    return (
      <div>
        <div ref={this.treeRef}></div>
      </div>
    );
  }
}
