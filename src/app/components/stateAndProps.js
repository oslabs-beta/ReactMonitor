import React, { Component } from 'react'

export default class StateAndProps extends Component {
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
              if(value[key]===null || value[key]=='null') temp.push(<li key={'props'+temp.length}>{key}:</li>)
              if(typeof value[key] !=='object'  )temp.push(<li key={'props'+temp.length}>{`${key}`}: <span className="span">{`${value[key]}`}</span></li>)
            }
            return temp
          }else{
            for(let i=0;i<value.length;i++){
              if(typeof value[i] ==='object') temp.push(this.creatlistProps(value[i]))
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
          <div className="StateAndProps">  
            <div className="StateAndProps__label"  onClick={() => this.props.onChange(!this.props.selected)}>{this.props.label}</div>
            <li><span className='stateChangeTitles'> State </span> {(state==null ||  state ==='null')?'':state}</li>
            <li><span className='stateChangeTitles'> Props </span> {(props==null ||  state ==='null')?'':props}</li>
          </div>
        )
    }
  }