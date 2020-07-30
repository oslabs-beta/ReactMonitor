const deleteHtmlElement=(object)=>{
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



export {deleteHtmlElement}
