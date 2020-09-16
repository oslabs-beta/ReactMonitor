import ComponentsList from '../src/app/components/componentsList'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(' ComponentsList component rendered correctly ', () => {
    let wrapper;
    let props = {
        components: [{children:[]}],
        onChange: () => true,
        selectedComponents: 0,
        isFirst:true
    }
    wrapper = shallow(<ComponentsList {...props}/>)
    it(' ComponentsList Component rendered correctly ', () => {
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('StateAndProps')).not.toEqual(undefined)
        expect(wrapper.find('ComponentsList')).not.toEqual(undefined)
        expect(wrapper.find('ul')).not.toEqual(undefined)
    })
})