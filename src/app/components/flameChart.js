import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph';

let chart;

export default class FlameChart extends Component {
  constructor(props) {
    super(props);
    this.flamegraphRef = React.createRef();
    this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount() {
    const { name, children, value } = this.props;
    // Example on how to use custom a tooltip.
    //   var tip = flamegraph.tooltip.defaultFlamegraphTooltip()
    //   .html(function(d) { return "name: " + d.data.name + ", value: " + d.data.value; });
    // chart.tooltip(tip);

    // const { name, children } = this.props;
    // const value = this.props.stats.renderTotal;
    // console.log(this.props.stats.renderTotal)
    // const root = d3.hierarchy(JSON.stringify({ name, value, children }))
    // const root = d3.hierarchy(JSON.stringify(flameGraphData));
    // console.log(root)
    console.log("THIS IS THE FLAMEGRAPH INPUT*********************: \n", this.props)
    this.createFlameGraph({ name, children, value })
  }

  // function invokeFind() {
  //   var searchId = parseInt(location.hash.substring(1), 10);
  //   if (searchId) {
  //     find(searchId);
  //   }
  // }

  createFlameGraph(data) {

    console.log('data in create: ', data)

    chart = flamegraph()
      // .height(1080)
      .width(500)
      .cellHeight(18)
      .transitionDuration(750)
      .minFrameSize(5)
      .transitionEase(d3.easeCubic)
      .sort(true)
      .title("")
      // .onClick(onClick)
      .differential(false)
      .elided(false)
      .selfValue(false)
      .setColorMapper((d, originalColor) =>
        d.highlight ? "#6aff8f" : originalColor);

    d3.select(this.flamegraphRef.current)
      .datum(data)
      .call(chart);
    // .call(invokeFind);
  }

  render() {
    return <div ref={this.flamegraphRef}></div>
  }
}