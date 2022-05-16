import {read, write, help} from './index.mjs'
var val = 88858548485
await write('test',{key: '123123',key2:val,array:['11','223']})
var test = await read('test')
if(test.key2 === val){
    console.log('Success')
} else {
    console.log('fail')
}