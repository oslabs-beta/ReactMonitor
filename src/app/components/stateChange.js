import React, { Component } from 'react'
import {deleteHtmlElement} from './helperFunctions'
import {componenetChangedState} from './helperFunctions'

export default class stateChange extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedcomponents: {},
            graph:[]
        }
    }
    cleanTree(){
      const {index} = this.props
      let current=this.props.currentState[index]
      let temp= JSON.parse(JSON.stringify(current? [current]:this.props.currentState))
      temp = componenetChangedState(deleteHtmlElement(temp))
      return temp
    }
    render() {
        const {selectedcomponents} = this.state;
        let current=this.cleanTree()
        if(this.props.currentState[this.props.index]){
          return (
              <div className="container">
                  <div className="wrapper">
                      <h1>Tree</h1>
                      <ComponentsList2 
                          components={[current]} 
                          onChange={(selectedcomponents) => this.setState({selectedcomponents})}
                          selectedcomponents={selectedcomponents} 
                          isFirst={true}
                      />
                  </div>
              </div>
          )
        }else{
          return (
            <h1>Nothing changed</h1>
          )
        }
    }
}

const ComponentsList2 = ({ components, selectedcomponents, onChange, isFirst, debug }) => {
 
    const handleCheckboxClicked = (selectedcomponentId) => {
  
      if(selectedcomponents[selectedcomponentId]){
        delete selectedcomponents[selectedcomponentId];
      } else {
        selectedcomponents[selectedcomponentId] = {}
        
      }
      
      onChange(selectedcomponents)
    }
    
    const handleSubcomponentsListChange = (componentId, subSelections) => {
      selectedcomponents[componentId] = subSelections;
      onChange(selectedcomponents);
    }
    console.log('comp',components)
    let counter=0
    return (
      <div>
        {components.map(component => (
            <ul className={isFirst && "firstUL"}>
              <Checkbox2 
                stats={component.stats}
                selected={selectedcomponents[component.name]} 
                label={component.name} 
                onChange={() => {handleCheckboxClicked(component.name)}}
              />
              {(component.children.length > 0 && selectedcomponents[component.name]) &&
                <ComponentsList2 
                  key={counter+=100}
                  components={component.children} 
                  selectedcomponents={selectedcomponents[component.name]} 
                  onChange={(subSelections) => handleSubcomponentsListChange(component.name, subSelections)}
                />
              }
            </ul>
          )
        )}
      </div>
    )
  }

class Checkbox2 extends Component {
    constructor(props){
        super(props)
        this.state={
            didmount:true
        }
    }
    componentDidMount(){
        // if(this.state.didmount){
            this.props.onChange(!this.props.selected)
        //     this.setState({didmount:false})
        // }
    }
    render(){
        console.log('state',this.props.state)
        console.log('props',this.props.state)
        return (
            <div className="checkbox">  
            <div className="checkbox__label" onClick={() => this.props.onChange(!this.props.selected)}>{this.props.label}</div>
            <h5>State:{this.props.state}</h5>
            <h5>Props:{this.props.props}</h5>
          </div>
        )
    }
  }