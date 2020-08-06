import React, { Component } from 'react'
import Playbutton from './playButton'
import Record from './record'
import Statechange from './stateChange'
import {deleteHtmlElement} from './helperFunctions'

export default class timeTravel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='timeTravel'>
            <div className='state-log'>
                <Record logofTime={this.props.logofTime} index={this.props.index}/>
                <Statechange currentState={this.props.currentState} index={this.props.index}/>
            </div>
            <Playbutton length={this.props.logofTime.length} index={this.props.index} handelPlay={this.props.handelPlay}/>
            </div>
        )
    }
}
