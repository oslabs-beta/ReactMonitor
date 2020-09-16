import React, { Component } from 'react'
import StateAndProps from './stateAndProps'

const ComponentsList = ({ components, selectedComponents, onChange, isFirst, debug }) => {

    const handleStateAndPropsClicked = (selectedComponentId) => {
  
      if(selectedComponents[selectedComponentId]){
        delete selectedComponents[selectedComponentId];
      } else {
        selectedComponents[selectedComponentId] = {}
        
      }
      
      onChange(selectedComponents)
    }
    
    const handleSubComponentsListChange = (componentId, subSelections) => {
      selectedComponents[componentId] = subSelections;
      onChange(selectedComponents);
    }
    
    let counter=0
    return (
      <div>
        {components.map(component => (
            <ul className={isFirst && "firstUL"}>
              <StateAndProps 
                state={component.state}
                props={component.props}
                selected={selectedComponents[component.name]} 
                label={component.name} 
                onChange={() => {handleStateAndPropsClicked(component.name)}}
              />
              {(component.children.length > 0 && selectedComponents[component.name]) &&
                <ComponentsList 
                  key={counter+=100}
                  components={component.children} 
                  selectedComponents={selectedComponents[component.name]} 
                  onChange={(subSelections) => handleSubComponentsListChange(component.name, subSelections)}
                />
              }
            </ul>
          )
        )}
      </div>
    )
}

export default ComponentsList