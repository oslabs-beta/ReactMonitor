const deleteHtmlElement=(obj)=>{
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

const componenetChangedState = (data) => {

    if(!data) return 
    //  let newGraph=JSON.parse(JSON.stringify(data))
    //  console.log(newGraph)
    console.log('inside helper function',data)
    const noChanges=[]
    const helper = (obj) =>{
        // console.log('obj',obj)
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
            if(obj.name==='ButtonPanel') console.log('target',obj)
            let run =true
            if(run){
                if(obj.nodeSvgShape.shapeProps.fill==='lightgreen'){
                    obj.state=obj.stats.state
                    obj.props=obj.stats.props
                    obj.time=obj.stats.value
                    delete obj.nodeSvgShape
                    delete obj.tag
                    delete obj.stats
                    run =false
                }else{
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
                // console.log(obj.children[i].children!==[])
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
// const obj4={
//     name:'test',
//     nodeSvgShape:{shapeProps:{fill:'red'}},
//     stats:{state:'state did not',props:'props did not '},
//     children:[]
// }
// const obj5={
//     name:'test2',
//     nodeSvgShape:{shapeProps:{fill:'lightgreen'}},
//     stats:{state:'I chabged',props:'I changed'},
//     children:[]
// }
// const obj2={
//    name:'button',
//    nodeSvgShape:{shapeProps:{fill:'lightgreen'}},
//    stats:{state:'I changed',props:'Ii changed'},
//    children:[obj4,obj5]
// }
// const obj3={
//     name:'display',
//     nodeSvgShape:{shapeProps:{fill:'red'}},
//     stats:{state:'I amhere',props:'Iama a prop'},
//     children:[obj4,obj5]
// }
//  const obj1={
//      name:'app',
//      nodeSvgShape:{shapeProps:{fill:'lightgreen'}},
//      stats:{state:'I changed',props:'I i changed'},
//      children:[obj2,obj3,obj2,obj3]
//  }
// console.log(componenetChangedState(obj1))

export {deleteHtmlElement,componenetChangedState }
