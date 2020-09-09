import React, { Component } from 'react'
import StateAndProps from './stateAndProps'

const ComponentsList = ({ components, selectedcomponents, onChange, isFirst, debug }) => {

    const handleStateAndPropsClicked = (selectedcomponentId) => {
  
      if(selectedcomponents[selectedcomponentId]){
        delete selectedcomponents[selectedcomponentId];
      } else {
        selectedcomponents[selectedcomponentId] = {}
        
      }
      
      onChange(selectedcomponents)
    }
    
    const handleSubcomponentsListChange = (componentId, subSelections) => {
      selectedcomponents[componentId] = subSelections;
      onChange(selectedcomponents);
    }
    
    let counter=0
    return (
      <div>
        {components.map(component => (
            <ul className={isFirst && "firstUL"}>
              <StateAndProps 
                state={component.state}
                props={component.props}
                selected={selectedcomponents[component.name]} 
                label={component.name} 
                onChange={() => {handleStateAndPropsClicked(component.name)}}
              />
              {(component.children.length > 0 && selectedcomponents[component.name]) &&
                <ComponentsList 
                  key={counter+=100}
                  components={component.children} 
                  selectedcomponents={selectedcomponents[component.name]} 
                  onChange={(subSelections) => handleSubcomponentsListChange(component.name, subSelections)}
                />
              }
            </ul>
          )
        )}
      </div>
    )
}

export default ComponentsList