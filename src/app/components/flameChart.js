<<<<<<< HEAD
import React, {Component} from 'react';
import * as flamegraph from 'd3-flame-graph';

class FlameChart extends Component {
  constructor(props) {
  super(props);
  this.flamegraphRef = React.createRef();
  this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount(){
    this.createFlameGraph()
  }

  componentDidUpdate(){
    this.createFlameGraph(stats)
  }

  createFlameGraph() {
    flamegraph.destroy();
    const chart = flamegraph()
      .width(960);

    d3.json("data.json", function(error, data) {
      if (error) return console.warn(error);
      d3.select("#flamegraph")
        .datum(data)
        .call(chart);
    })
=======
import React, { Component } from 'react';

class FlameChart extends Component {
  constructor(props) {
    super(props);
>>>>>>> a2bc8571ba1cb91142f2d01c6130e2d74a4fedb9
  }

  render() {
    return (
<<<<<<< HEAD
    <div ref={this.flamegraphRef} className="flamegraph">
=======
      <div>
>>>>>>> a2bc8571ba1cb91142f2d01c6130e2d74a4fedb9
        In progress: Flame Chart
      </div>
    );
  }
}

export default FlameChart;