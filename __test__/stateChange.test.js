import StateChange from '../src/app/components/stateChange'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(' StateChanges component rendered correctly ', () => {
    let wrapper;
    let props = {
        currentState: [{}],
        index: 0,
    }
    wrapper = shallow(<StateChange {...props}/>)
    it(' Record rendered correctly ', () => {
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('h2').text()).toEqual('State Diff')
        expect(wrapper.find('ComponentsList2')).not.toEqual(undefined)
    })
})