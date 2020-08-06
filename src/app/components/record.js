import React, { Component } from 'react'

export default class record extends Component {
    constructor(props){
        super(props)
    }
    render() {
        if(this.props.logofTime){
            return (
                <ul style={{marginLeft:'-50px',}}>
                    {this.props.logofTime.map((elem,i) =>{
                        if(this.props.index===i){
                           return <li key={i}><mark>Name:{elem[0]}   Time:{elem[1]}</mark></li>
                        }else{
                           return  <li key={i}>Name:{elem[0]}   Time:{elem[1]}</li>
                        }
                        })}
                </ul>
            )
        }else{
            return (
                <h1></h1>
            )
        }
    }
}
