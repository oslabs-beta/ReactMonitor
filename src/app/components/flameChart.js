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
  }

  render() { 
    return (
    <div ref={this.flamegraphRef} className="flamegraph">
        In progress: Flame Chart
    </div>  
    );
  }
}
 
export default FlameChart;