import React, { Component } from 'react'

export default class playButton extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          percentage: 0
        }
        
        this.nextStep = this.nextStep.bind(this)
      }
      
      nextStep() {
        if(this.state.percentage === 100) return 
        this.setState(prevState => ({ percentage: prevState.percentage + 20 }))
      }
      
      render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>  
                    <button onClick={this.nextStep}>play</button>  
                </div>
                <div style={{
                    position: 'relative',
                    height: '20px',
                    width: '350px',
                    borderRadius: '50px',
                    border: '1px solid #333',
                  }}>
                    <div  style={{ width: `${this.state.percentage}%`,
                    background: '#1DA598',
                    height: '100%',
                    borderRadius: 'inherit',
                    transition: 'width .2s ease-in'
                }} />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button  onClick={() => this.setState({ percentage: 0 })}>Reset</button>
                </div>   
            </div>
        )
      }  
    }
