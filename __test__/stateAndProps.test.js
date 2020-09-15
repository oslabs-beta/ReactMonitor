import StateAndProps from '../src/app/components/stateAndProps'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(' StateAndProps component rendered correctly ', () => {
    let wrapper;
    let props = {
        state: [],
        props: [],
        selected:[],
        label:'',
        onChange:() => true
    }
    wrapper = shallow(<StateAndProps {...props}/>)
    it(' StateAndProps component rendered correctly ', () => {
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('li')).not.toEqual(undefined)
        expect(wrapper.find('span').at(0).text()).toEqual(' State ')
        expect(wrapper.find('span').at(1).text()).toEqual(' Props ')
    })
})