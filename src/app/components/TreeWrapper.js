import React, { Component } from 'react';
import d3 from 'd3';

let root;

export default class TreeWrapper extends Component {
  constructor(props) {
    super(props);
    this.treeRef = React.createRef();
    this.maked3Tree = this.maked3Tree.bind(this);
    this.removed3Tree = this.removed3Tree.bind(this);
  }

  componentDidMount() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree();
  }

  componentDidUpdate() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree();
  }

  removed3Tree() {
    const { current } = this.treeRef;
    while (current.hasChildNodes()) {
      current.removeChild(current.lastChild);
    }
  }

  maked3Tree() {
    this.removed3Tree();
    const margin = {
      top: 0,
      right: 60,
      bottom: 200,
      left: 120,
    };
    const width = 600 - margin.right - margin.left;
    const height = 700 - margin.top - margin.bottom;

 
    const treeHierarchy = d3.hierarchy(root);
      const tree = d3.tree();
      const d3root = tree(treeHierarchy);
      // console.log('this is the data: ', data);
      // console.log('this is the root val: ', root);
  
      let x0 = 0;
      let x1 = -x0;
      d3root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });
  
      const svg = d3
        .select(this.treeRef)
        .append('svg')
        .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2]);
  
      const g = svg
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);
  
      const link = g
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr(
          'd',
          d3
            .linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x)
        );
  
      const node = g
        .append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', (d) => `translate(${d.y},${d.x})`);
  
      node
        .append('circle')
        .attr('stroke', (d) => (d.children ? '#555' : '#999'))
        .attr('stroke-width', (d) => 1)
        .attr('fill', () => '#fff')
        .attr('r', 5);
  
      node
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d.children ? -6 : 6))
        .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
        .text((d) => d.data.name)
        .clone(true)
        .lower()
        .attr('stroke', 'white');
  }
  

  render() {
    return (
      <div>
        <div ref={this.treeRef}></div>
      </div>
    );
  }
}