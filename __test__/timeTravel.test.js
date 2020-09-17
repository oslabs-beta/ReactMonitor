
import TimeTravel from '../src/app/components/timeTravel'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Time travel rendered correctly', () => {
    let wrapper
    let props = {
        currentState:[{}],
        handelPlay : () => 'hello world',
        logofTime: [['App',1.5]],
        index:0
    }
    beforeAll(() => {
        wrapper = shallow(<TimeTravel 
            currentState = { props.currentState }
            handelPlay = { props.handelPlay }
            logofTime = { props.logofTime }
            index = { props.index }
            />)
    })
    it('Timetravel rendered correctly', () => {
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('Playbutton')).toEqual({})
        expect(wrapper.find('Record')).toEqual({})
        expect(wrapper.find('Statechange')).toEqual({})
        expect(wrapper.find('Playbutton')).toEqual({})
    })
})