import * as d3 from 'd3';
import React, { Component } from 'react';

export default class Tree extends Component {
  constructor(props) {
    super(props);

    const testRoot = {
      name: 'Eve',
      children: [
        {
          name: 'Cain',
        },
        {
          name: 'Seth',
          children: [
            {
              name: 'Enos',
            },
            {
              name: 'Noam',
            },
          ],
        },
        {
          name: 'Abel',
        },
        {
          name: 'Awan',
          children: [
            {
              name: 'Enoch',
            },
          ],
        },
        {
          name: 'Azura',
        },
      ],
    };

    const data = d3.hierarchy(testRoot);
    // console.log(data);
    const treeChart = d3.tree();
    const root = treeChart(data);
    // console.log(root);
  }

  render() {
    return (
      <div>
        <h1>HELLO FROM THE TREE</h1>
        <div>{this.root}</div>
      </div>
    );
  }
}
