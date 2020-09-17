import React, { Component } from 'react'
import Playbutton from './playButton'
import Record from './record'
import Statechange from './stateChange'

export default class timeTravel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='timeTravel'>
            <div className='state-log'>
                <div className ='state-change'>
                <Statechange currentState={this.props.currentState} index={this.props.index}/>
                </div>
                <div className='log'>
                <Record logofTime={this.props.logofTime} index={this.props.index}/>
                </div>
            </div>
            <Playbutton length={this.props.logofTime.length} index={this.props.index} handelPlay={this.props.handelPlay}/>
            </div>
        )
    }
}
