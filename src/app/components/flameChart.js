import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph'

let root = {
  "name": "Eve",
  "value": 9.27,
  "children": [
    {
      "name": "Cain",
      "value": 4,
    },
    {
      "name": "Seth",
      "value": 5,
      "children": [
        {
          "name": "Enos",
          "value": 8.23,
        },
        {
          "name": "Noam",
          "value": 1.24,
        }
      ]
    },
    {
      "name": "Abel",
      "value": 2,
    },
    {
      "name": "Awan",
      "value": 2.09,
      "children": [
        {
          "name": "Enoch",
          "value": 4,
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}

let chart;

export default class FlameChart extends Component {
  constructor(props) {
    super(props);
    this.flamegraphRef = React.createRef();
    // this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount() {
    // const { name, children } = this.props;
    // const root = d3.hierarchy(JSON.stringify({ children }))
    console.log('this is the mount Root: ', root)
    this.createFlameGraph(d3.hierarchy(JSON.stringify(root)))
  }

  componentDidUpdate() {
    // const { name, children } = this.props;
    // const root = d3.hierarchy(JSON.stringify({ children }))
    console.log('This is the update Root: ', root)
    this.createFlameGraph(d3.hierarchy(JSON.stringify(root)))
  }

  createFlameGraph(data) {

    console.log('data in create: ', data)

    chart = flamegraph()
      .title('a beautiful Flamegraph')
      // .onClick((d) => console.info("You clicked on frame " + d.data.name))
      .height(1080)
      .width(960)
      .cellHeight(18)
    // .transitionDuration(0)
    // .minFrameSize(0)
    // .transitionEase(d3.easeCubic)
    // .sort(true)
    // .title("");
    setTimeout(() => {
      d3.select(this.flamegraphRef)
        .datum(data)
        .call(chart)
    }, 200)
  }

  render() {
    return <div ref={this.flamegraphRef}></div>
  }
}



// import React, {Component} from 'react';
// import { FlameGraph } from 'react-flame-graph';
// import { hierarchy } from 'd3';


// class FlameChart extends Component {
//   constructor(props) {
//   super(props);

//   // this.flamegraphRef = React.createRef();
//   // this.createFlameGraph = this.createFlameGraph.bind(this);
//   }

//   componentDidMount(){
//     const { name, children } = this.props;
//     const value = this.props.stats.renderTotal;
//     const hierarchy = { name, value, children };
//     // this.createFlameGraph(stats)
//   }

//   // componentDidUpdate(){
//   //   const { stats } = this.props;
//   //   this.createFlameGraph(stats)
//   // }

//   // createFlameGraph(data) {
//   //   flamegraph(data)
//   //     .width(960)

//   //   d3.json("data.json", function(error, data) {
//   //     if (error) return console.warn(error);
//   //     d3.select("#flamegraph")
//   //       .datum(data)
//   //       .call(chart);
//   //   })
//   //   flamegraph.onClick((d)=>{
//   //     console.log(d.data.name)
//   //   })
//   //   flamegraph.setDetailsElement(document.getElementById("details"));
//   // }// <div ref={this.flamegraphRef} className="flamegraph"></div>

//   render() {
//     return (
//       <FlameGraph
//         data={hierarchy}
//         height={200}
//         width={400} 
//       />
//     );
//   }
// }

// export default FlameChart;