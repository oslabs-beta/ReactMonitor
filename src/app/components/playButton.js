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
            <div style={{display:'flex',justifyContent:'center',alignItems:'baseline',height:'50px',}}>
            <div style={{display:'flex',justifyContent:'flex-end',height:'50px',width:'30%', marginRight:'10px'}}>
              <div style={{ marginTop: '20px',  marginRight:'10px' }}>  
                  <button style={{borderRadius: '10px', outline: 'none'}} onClick={()=>{
                    this.setState({pause:false})
                    this.nextStep()
                  }}>Play</button>  
              </div>
              <div style={{ marginTop: '20px', }}>
                  <button style={{borderRadius: '10px', outline: 'none'}} onClick={() => {
                    this.setState({ pause: true })
                  }}>Pause</button>
              </div>  
            </div>
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'baseline',height:'50px',width:'70%'}}>
              <div style={{position: 'relative',height: '10px', width: '70%', borderRadius: '50px',border: '1px solid #333',marginTop:'20px'}}>
                  <div  style={{ width: `${this.state.percentage}%`,
                  background: '#1DA598',
                  height: '100%',
                  borderRadius: 'inherit',
                  transition: 'width .2s ease-in'
              }} />
              </div>
              <div style={{ marginTop: '20px',width:'10%',marginLeft:'10px' }}>
                  <button style={{borderRadius: '10px', outline: 'none'}} onClick={() => {
                    
                    this.props.handelPlay('reset')
                    this.setState({ percentage: 0 })
                    this.setState({ pause: true })
                  }}>Reset</button>
              </div>   
            </div>
            </div>
        )
      }  
    }
