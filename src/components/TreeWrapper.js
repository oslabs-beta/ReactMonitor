import React, { Component } from 'react';
import D3Tree from './D3Tree';

export default class TreeWrapper extends Component {
  componentDidMount() {
    this.setState({
      tree: new D3Tree(this.refs.tree),
    });
  }

  // ensures that component doesn't automatically rerender
  // shouldComponentUpdate() {
  //   return false;
  // }

  // fires when a component receives props, but before any rerendering takes place
  // componentDidUpdate(nextProps) {
  //   // main input (state/props) for the tree should be input to the update func
  //   this.state.tree.update(nextProps.gender);
  // }

  render() {
    return <div ref="tree"></div>;
  }
}
