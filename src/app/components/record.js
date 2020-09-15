import React, { Component } from 'react'

export default class record extends Component {
    constructor(props){
        super(props)
    }
    render() {
        if(this.props.logofTime){
            return (
                <div>
                <h2 className='graph-title'>Time</h2>
                    <ul>
                        {this.props.logofTime.map((elem,i) =>{
                            if(this.props.index===i){
                            return <li key={i}><span id='highlight'>Name:{elem[0]}   Time:{elem[1]}</span></li>
                            }else{
                            return  <li key={i}>Name:{elem[0]}   Time:{elem[1]}</li>
                            }
                            })}
                    </ul>
                </div>
            )
        }else{
            return (
                <h1></h1>
            )
        }
    }
}
