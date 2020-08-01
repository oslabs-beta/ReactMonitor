import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import D3Tree from './d3tree';
import FlameChart from './flameChart'

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div>
          <div className="navbar">
            <li><Link to="/">Tree</Link></li>
            <li><Link to="/chart">Chart</Link></li>
          </div>
          <Switch>
            <Route path="/chart">
              <FlameChart value={this.props.value} name={this.props.name} children={this.props.children} />
            </Route>
            <Route path="/">
              <D3Tree name={this.props.name} children={this.props.children} stats={this.props.stats}  oldState={this.props.oldState} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
