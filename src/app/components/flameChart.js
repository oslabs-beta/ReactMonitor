import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph';


export default class FlameChart extends Component {
  constructor(props) {
    super(props);
    this.flamegraphRef = React.createRef();
    this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount() {
    const { name, children, value } = this.props;
    this.createFlameGraph({ name, children, value })
  }

  componentDidUpdate() {
    const { name, children, value } = this.props;
    this.createFlameGraph({ name, children, value })
    console.log('flamegraphref: ', this.flamegraphRef)
    console.log('flamegraphrefcurrent: ', this.flamegraphRef.current)
  }

  // Example on how to use custom a tooltip.
  //   var tip = flamegraph.tooltip.defaultFlamegraphTooltip()
  //   .html(function(d) { return "name: " + d.data.name + ", value: " + d.data.value; });
  // chart.tooltip(tip);

  // function invokeFind() {
  //   var searchId = parseInt(location.hash.substring(1), 10);
  //   if (searchId) {
  //     find(searchId);
  //   }
  // }

  createFlameGraph(data) {
    // document.querySelector('.partition').remove();
    // if (currentGraph) currentGraph.destroy()

    let chart = flamegraph()
      // .height(1080)
      .width(980)
      .cellHeight(20)
      .transitionDuration(750)
      .minFrameSize(5)
      .transitionEase(d3.easeCubic)
      .sort(true)
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
    return (
      <div>
        <h3 id="flame-title">Render Times Flame Graph</h3>
        <div className="flameDiv" ref={this.flamegraphRef}></div>
      </div>
    )
  }
}