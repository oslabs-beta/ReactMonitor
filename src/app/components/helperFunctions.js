const deleteHtmlElement = (obj)=>{
    const helper=(object)=>{
        if(!object.children) return 
        for(let i=0;i<object.children.length;i++){
            //check if html element or react componenet
            if(object.children[i].name[0]===object.children[i].name[0].toUpperCase()){
                deleteHtmlElement(object.children[i])
            }else{
                //check if html element has children
                if(object.children[i].children) {
                    let temp=object.children[i].children
                    object.children[i]= temp
                    // link grandchidlren to parent and delete parent  
                    object.children=object.children.reduce((acc, val) => acc.concat(val), [])
                    i=i-1
                }else {
                    // delete element 
                    delete object.children[i]
                    i=0
                }
            }
        }
        return object
    }
    if(obj[0]){
        return helper (obj[0])
    }else{
        return helper(obj)
    }
}
/* This function is used to delete any coomponent that didn't changed state 
before getting passed to the time travel display componet */
const componentChangedState = (data) => {
    if(!data) return 
    const noChanges=[]
    const helper = (obj) =>{
        if(!obj.children.length) {
            if(obj.nodeSvgShape.shapeProps.fill==='lightgreen'){
                obj.state=obj.stats.state
                obj.props=obj.stats.props
                delete obj.nodeSvgShape
                delete obj.tag
                delete obj.stats
            }else{
                noChanges.push({
                    name:obj.name,
                    state:obj.stats.state,
                    props:obj.stats.props,
                    time:obj.value
                })
            }
        }else{
            // if(obj.name==='ButtonPanel') console.log('target',obj)
            let run =true
            if(run){
                if(obj.nodeSvgShape.shapeProps.fill==='lightgreen' ){
                    obj.state = obj.stats.state
                    obj.props = obj.stats.props
                    obj.time = obj.stats.value
                    delete obj.nodeSvgShape
                    delete obj.tag
                    delete obj.stats
                    run = false
                } else {
                    noChanges.push({
                        name:obj.name,
                        state:obj.stats.state,
                        props:obj.stats.props,
                        time:obj.stats.value,
                        dark:true
                    })
                    obj.state=obj.stats.state
                    obj.props=obj.stats.props
                    obj.time=obj.stats.value
                    obj.dark=true
                    delete obj.nodeSvgShape
                    delete obj.tag
                    delete obj.stats
                    run = false
                }
            }
            for (let i=0;i<obj.children.length;i+=1){
                if(obj.children[i].children.length){
                    helper(obj.children[i])
                } else {
                    if(obj.children[i].nodeSvgShape.shapeProps.fill==='lightgreen' )  {helper(obj.children[i])}
                    else{
                        delete obj.children[i]
                    }
                }
            }
        }
    }
    helper(data)
    return data
}
const fixState = (obj) => { 
if(obj === 'nothing' || typeof obj != 'object' || obj === {}) return
    if( typeof obj.state == 'string' ){
        let tempState = JSON.parse(obj.state)
        if( tempState != null ) {
            if( tempState.memoizedState ){
                let memoizedState= tempState.memoizedState
                obj.state=memoizedState.memoizedState
            } else obj.state=tempState
        }
    } if ( typeof obj.props == 'string' ){
        let tempProps = JSON.parse( obj.props )
        if ( tempProps != null )obj.props=tempProps
    }
        if ( obj.children.length ) {
            for ( let i=0;i<obj.children.length;i+=1 ){
                fixState(obj.children[i])
            }
        }
        return obj
}

export {deleteHtmlElement, componentChangedState, fixState}
