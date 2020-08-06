import React, { Component } from 'react'

export default class playButton extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          percentage: 0,
          play:false,
          pause:false
        }
        
        this.nextStep = this.nextStep.bind(this)
      }
      
      nextStep() {
        if(this.state.percentage === 100) return 
        let timer = setInterval(() => {
          if(!this.state.pause){
            if(this.state.percentage===0){
              this.setState(prevState => ({ percentage: prevState.percentage + (100/this.props.length) }))
            }
            if(this.state.percentage >= 95) {
              this.setState(prevState => ({ percentage:100 }))
              this.props.handelPlay('stop')
              clearInterval(timer)
            }else{
              this.props.handelPlay()
              this.setState(prevState => ({ percentage: prevState.percentage + (100/this.props.length) }))
            }
            
          }else clearInterval(timer)
        }, 1000);
      }
      
      render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>  
                    <button onClick={()=>{
                      this.setState({pause:false})
                      this.nextStep()
                    }}>play</button>  
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
                    <button  onClick={() => {
                      
                      this.props.handelPlay('reset')
                      this.setState({ percentage: 0 })
                      this.setState({ pause: true })
                    }}>Reset</button>
                </div>   
                <div style={{ marginTop: '20px' }}>
                    <button  onClick={() => {
                      this.setState({ pause: true })
                    }}>Pause</button>
                </div>  
            </div>
        )
      }  
    }
