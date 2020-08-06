import React, { Component } from 'react'
import {deleteHtmlElement, fixState,componenetChangedState} from './helperFunctions'
// import {componenetChangedState} from './helperFunctions'

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
      console.log('buatad',this.props.currentState)
      temp = componenetChangedState(deleteHtmlElement(temp))

      temp =fixState(temp? temp:'nothing')
      return temp
    }
    render() {
      if(this.props.currentState[this.props.index]){
        const {selectedcomponents} = this.state;
          let current=this.cleanTree()
          return (
              <div className="state-changes">
                  <div className="wrapper">
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
    
    let counter=0
    return (
      <div>
        {components.map(component => (
            <ul className={isFirst && "firstUL"}>
              <Checkbox2 
                state={component.state}
                props={component.props}
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
      creatlistState(value){
        const temp=[]
        if(value !== null){
          if(!Array.isArray(value) && value!== null && value !== undefined && Object.getPrototypeOf(value).isPrototypeOf(Object)){
          for(let key in value){
            if(typeof value[key] ==='object' && value[key] !=null) temp.push(this.creatlistState(value[key]))
            if(value[key]===null || value[key]=='null' || this.props.label=='UserTable') temp.push(<li key={'state' + temp.length}>{key}: null</li>)
            if(typeof value[key] !=='object') temp.push(<li key={'state'+temp.length}>{key}:<span className='span'>{`${value[key]}`}</span> </li>)
          }
          return temp
          }else if(Array.isArray(value)){
              for(let i=0;i<value.length;i++){
                if(typeof value[i] ==='object') temp.push(this.creatlistProps(value[i]))
              }
            }
            return temp
      }
      return temp
    }
    creatlistProps(value){
      const temp = []
        if(value !== null){
          if(!Array.isArray(value)){
            for(let key in value){
              if(typeof value[key] ==='object' && value[key] !=null) temp.push(this.creatlistProps(value[key]))
              if(value[key]===null || value[key]=='null') temp.push(<li key={'props'+temp.length}>{key}: null</li>)
              if(typeof value[key] !=='object'  )temp.push(<li key={'props'+temp.length}>{`${key}`}: <span className="span">{`${value[key]}`}</span></li>)
            }
            return temp
          }else{
            for(let i=0;i<value.length;i++){
              if(typeof value[i] ==='object') temp.push(this.creatlistProps(value[i]))
              // if(value[i]===null) temp.push(<li key={'props'+temp.length}>{key}: {'null'}</li>)
              // else temp.push(<li key={'props'+temp.length}>{key}: {`${value[i]}`}</li>)
            }
          }
          return temp
    }
    return temp
  }
    render(){
      
        const state= (this.props.state !==null)? this.creatlistState(this.props.state):[]
        const props= (this.props.props !==null)? this.creatlistProps(this.props.props):[]
        return (
            <div className="checkbox">  
            <div className="checkbox__label" onClick={() => this.props.onChange(!this.props.selected)}>{this.props.label}</div>
            <li>State: {(state==null ||  state ==='null')?'':state}</li>
            <li>Props: {(props==null ||  state ==='null')?'':props}</li>
          </div>
        )
    }
  }