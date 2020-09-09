import PlayButton from '../src/app/components/playButton'
import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(' PlayButton rendering correctly', () => {
    let wrapper;
    let props = {
        logOfTime: 1,
        index: 0,
        handelPlay: () => true,
    }
    beforeAll(() => {
        wrapper = shallow(<PlayButton
            logOfTime = { props.logOfTime }
            index = { props.index }
            handelPlay = { props.handelPlay}
        />)
    })
    it(' PlayButton rendered correctly ', () => {
        const label = ['Play','Pause','Reset']
        expect(wrapper.type()).toEqual('div')
        expect(wrapper.find('button')).toHaveLength(3)
        for(let i=0; i<3;i+=1){
            expect(wrapper.find('button').at(i).text()).toEqual(label[i])
        }
    })
})