import {mkdirSync, existsSync} from 'fs'
import { Low, JSONFile } from 'lowdb'
export class Easy {
    constructor (key, dir){
        this.key = key
        this.dir = dir || `${process.cwd()}/ez`
        this.data = {}
        if(!dir && !existsSync(`${process.cwd()}/ez`)){
            mkdirSync(`${process.cwd()}/ez`)
        }
    }
    read = async () => {
        try {
            var temp = await load(this.key, this.dir)
            this.data = temp[this.key].data

            if(!this.data.array.length){
                this.data.array = []
            }
            
            if (!this.data.__dbKey){
                this.data.__dbKey = this.key
            }
        } catch (err){
            console.log(`easy-lowdb read ${this.key}`, err)
        }
        return this
    }
    write = async () => {
        try {
            var tempDict = await load(this.key, this.dir)
            tempDict[this.key].data = this.data
            await tempDict[this.key].write()
            return true
        } catch (err){
            console.log(`easy-lowdb write ${this.key}`, err)
        }
    }
}

async function load(key,dir){
    try {
        var tempDict = {}
        tempDict[key] = new Low(new JSONFile(`${dir}/${key}.json`))
        await tempDict[key].read()
        tempDict[key].data||={array: [], __dbKey: key}
        return tempDict
    } catch(err){
        console.log(`easy-lowdb load ${this.key}`, err)
        return null
    }
}