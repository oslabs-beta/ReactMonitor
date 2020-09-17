import Record from '../src/app/components/record'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(' Record component rendered correctly ', () => {
    let wrapper;
    let props = {
        logofTime: [1],
        index: 0,
    }
    wrapper = shallow(<Record
        logofTime = { props.logofTime }
        index = { props.index }
    />)
    it(' Record rendered correctly ', () => {
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('h2').text()).toEqual('Time')
        expect(wrapper.find('ul')).not.toEqual(undefined)
        expect(wrapper.find('span')).not.toEqual(undefined)
        expect(wrapper.find('li')).not.toEqual(undefined)
    })
})