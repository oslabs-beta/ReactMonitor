import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph'

let chart;

export default class FlameChart extends Component {
  constructor(props) {
    super(props);
    this.flamegraphRef = React.createRef();
    this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount() {
    const { name, children } = this.props;
    const value = this.props.stats.renderTotal;
    console.log(value)
    const root = d3.hierarchy(JSON.stringify({ name, value, children }))
    console.log(root)
    this.createFlameGraph(root)
  }

  createFlameGraph(data) {

    chart = flamegraph()
      .height(1080)
      .width(960)
      .cellHeight(18)
      .transitionDuration(0)
      .minFrameSize(0)
      .transitionEase(d3.easeCubic)
      .sort(true)
      .title("");

    d3.select(this.flamegraphRef.current)
      .datum(data)
      .call(chart)
  }

  render() {
    return <div ref={this.flamegraphRef}></div>
  }
}