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
              <FlameChart name={this.props.name} children={this.props.children} stats={this.props.stats}/>
            </Route>
            <Route path="/">
              <D3Tree name={this.props.name} children={this.props.children} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
