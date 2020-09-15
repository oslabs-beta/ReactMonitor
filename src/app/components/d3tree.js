import React, { Component } from 'react';
import * as d3 from 'd3';
import TimeTravel from './timeTravel';
import {deleteHtmlElement,fixState} from './helperFunctions'
// import {fixState} from './helperFunctions'

let root;


export default class D3Tree extends Component {
  constructor(props) {
    super(props);
    this.state={
      htmlElement:false,
      timeTravel:[],
      index:0,
      logofTime:[],
      playing:false
      
    }
    this.treeRef = React.createRef();
    this.maked3Tree = this.maked3Tree.bind(this);
    this.removed3Tree = this.removed3Tree.bind(this);
    this.removeHtml=this.removeHtml.bind(this)
    this.handelPlay=this.handelPlay.bind(this)
    this.width = 500
  }

  componentDidMount() {
    const { name, children, stats } = this.props;
    const hierarchy = { name, children, stats };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree(root);
  }
  
  componentDidUpdate() {
    console.log('last one',this.props.oldState[this.state.index])
    if(this.state.playing){
      var { name, children, stats } = this.props.oldState[this.state.index];

    }
    if(!this.state.playing) var{ name, children, stats } = this.props.oldState[this.props.oldState.length-1];
    
    const hierarchy = { name, children, stats };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree(root);
    if(this.state.timeTravel.length !==this.props.oldState.length){
      let tempTimeTravel =[...this.props.oldState]
      let tempLogofTime=[...this.state.logofTime]
      tempLogofTime.push([this.props.oldState[this.props.oldState.length-1].name,this.props.oldState[this.props.oldState.length-1].value])
      this.setState({timeTravel:tempTimeTravel,logofTime:tempLogofTime})
    }
    
  }

  componentWillUnmount() {
    this.removed3Tree();
  }
  removeHtml(){
    const state=this.state
    if(this.state.htmlElement)  this.setState({...state,htmlElement:false})
    if(!this.state.htmlElement)  this.setState({...state,htmlElement:true})
  }
  handelPlay(value){
    let temp=this.state.index
    if(!value){
      temp+=1
      this.setState({playing:true})
      this.setState({index:temp})
    }else if(value==='stop'){
      return
    }else{
      this.setState({index:0})
    }
  }

  removed3Tree() {
    const { current } = this.treeRef;
    document.querySelectorAll('.tooltip').forEach(el => el.remove());
    while (current.hasChildNodes()) {
      current.removeChild(current.lastChild);
    }
  }

  tree(data) {
    if(this.state.htmlElement){
      data = deleteHtmlElement(data)
      console.log(data)
      const root = d3.hierarchy(data);
      root.dx = 10;
      root.dy = this.width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    }else{
     const root = d3.hierarchy(data);
     root.dx = 10;
     root.dy = this.width / (root.height + 1);
     return d3.tree().nodeSize([root.dx, root.dy])(root);
   }
  };

  maked3Tree(data) {
    this.removed3Tree();
    const root = this.tree(data);

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }

    let x0 = 0;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3
      .select(this.treeRef.current)
      .append('svg')
      .attr('viewBox', [
        -margin.left,
        -margin.top,
        this.width + margin.left + margin.right,
        x1 - x0 + root.dx * 2 + margin.top + margin.bottom,
      ]);

    const g = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#D4CDF4')
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
      .attr('fill', function (d) {
        if (d.data.nodeSvgShape) {
          return d.data.nodeSvgShape.shapeProps.fill
        }
        return 'gray'
      })
      .attr('r', 5)

      // tooltip MouseOver
      .on('mouseover', function (d) {

        d3.select(this)
          .transition(100)
          .duration(50)
          .attr('r', 8);

        tooltipDiv.transition()
          .duration(50)
          .style('opacity', 0.9);

        tooltipDiv.html(`<h3>${d.data.name}</h3>
                         <hr>
                         <strong>State</strong>: ${d.data.stats.state}<br>
                         <br><strong>Props</strong>: ${d.data.stats.props}<br>
                         <br><strong>Tag</strong>: ${d.data.tag}<br>
                         <br><strong>EffectTag</strong>: ${d.data.stats.effectTag}<br>
                         <br><strong>Render Time</strong>: ${d.data.stats.renderTotal}ms</p>
                         `, this)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY) + 'px');
      })
      // eslint-disable-next-line no-unused-vars
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', 5);

        tooltipDiv.transition()
          .duration(400)
          .style('opacity', 0);
      })

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d.children ? -6 : 6))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke', 'white');

    // define tooltip
    const tooltipDiv = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  render() {
    return (
      <div >
        <div className="container" id="tree-container">
          <h3 className="graph-title">Render Times Tree Graph</h3>
          <button style={{borderRadius:'10px', display:'flex',justifyContent:'flex-start'}} className='html-btn' onClick={this.removeHtml} >Hide HTML </button>
          <div className="graphDiv" ref={this.treeRef}> </div>
        </div>
        <TimeTravel currentState={this.props.oldState} 
                    handelPlay={this.handelPlay} 
                    logofTime ={this.state.logofTime} 
                    index={this.state.index}/>
      </div>
    )
  }
}