import {deleteHtmlElement, componentChangedState, fixState} from '../src/app/components/helperFunctions'
import mockData from '../mockData/devToolData';
describe('test deletteHtmlElemnet , componentChangedState, fixState', () => {
    
    it('test deleteHtmlElement', () => {
        deleteHtmlElement(mockData)
        const testFunction = (obj) => {
            expect(obj.name[0]).toBe(obj.name[0].toUpperCase())
            if(obj.children.length){
                for (let child of obj.children){
                    testFunction(child)
                }
            }
        }
        testFunction(mockData)
    })
    it('test componentChangedstate' , () => {
        componentChangedState(mockData)
        const testFunction = (obj) => {
            expect(obj.stats).toBe(undefined) 
            expect(obj.nodeSvgShape).toBe(undefined) 
            expect(obj.tag).toBe(undefined) 
            if( obj.children.length ) {
                for( let child of obj.children ){
                    testFunction(child)
                }
            }
        }
        testFunction(mockData)
    })
    it( 'test deleteHtmlElement' , () => {
        fixState(mockData)
        const testFunction = (obj) => {
            expect(typeof obj.state ).not.toBe('string')
            expect(typeof obj.props ).not.toBe('string')
            if (obj.children.length){
                for (let child of obj.children)
                testFunction(child)
            }
        }
    })
})