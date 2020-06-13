import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph';
import flameGraphData from '../../../mockData/tinyFlameGraph';

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
    const data = {
      "name": "codesmith",
      "value": 100,
      "children": [
        {
          "name": "genunix`syscall_mstate",
          "value": 70,
        },
        {
          "name": "america",
          "value": 40,
          "children": [
            {
              "name": "unix`page_lookup_create",
              "value": 30
            }
          ],
        }],
    }


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
    this.createFlameGraph(this.props.children)
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