import React, { Component } from 'react'
import {deleteHtmlElement, fixState,componentChangedState} from './helperFunctions'
import ComponentsList from './componentsList'

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
      temp = componentChangedState(deleteHtmlElement(temp))

      temp =fixState(temp? temp:'nothing')
      return temp
    }
    render() {
      if(this.props.currentState[this.props.index]){
        const {selectedcomponents} = this.state;
          let current=this.cleanTree()
          return (
            <div>
            <h2 className='graph-title'>State Diff</h2>
              <div className="state-changes">
                  <div className="wrapper">
                      <ComponentsList 
                          components={[current]} 
                          onChange={(selectedcomponents) => this.setState({selectedcomponents})}
                          selectedcomponents={selectedcomponents} 
                          isFirst={true}
                      />
                  </div>
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

