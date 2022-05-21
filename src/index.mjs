import {readdirSync, mkdirSync, existsSync, writeFileSync} from 'fs'
import { Low, JSONFile } from 'lowdb'

export async function read(key,dir){
    try {
        var temp = await load(key, dir)
        if (!key){
            return temp
        } else if(!temp || !temp[key]){
            temp = await addKey(key,{} ,dir)
            return temp[key].data
        } else {
            return temp[key].data
        }
    } catch (err){
        console.log(`easy-db ERROR ${key}`, err)
    }

}

export async function write(dbKey,data,dir){
    // console.log(`Writing to: ${dir} with Key: ${dbKey}`)
    var tempDict = await load(dbKey, dir)
    if(!tempDict[dbKey]){
        tempDict = await addKey(dbKey,tempDict, dir)
    }
    data._dbkey=dbKey
    tempDict[dbKey].data = data
    await tempDict[dbKey].write()
    return true
}
async function addKey(key, tempDict, dir){
    tempDict[key] = new Low(new JSONFile(`${dir}/${key}.json`))
    await tempDict[key].read()
    tempDict[key].data||={}
    return tempDict
}

async function getDir(dir){
    // console.log('getDir', dir)
    var __datadir
    if(dir){
        __datadir = `${dir}`
    } else {
        __datadir = `${process.cwd()}/data`
    }
   
    if(!existsSync(__datadir)){
        mkdirSync(__datadir)
    }
    // var dataDir = await readdirSync(__datadir)

    // var __easydir = `${__datadir}/easy`
    // if(!existsSync(__easydir)){
    //     mkdirSync(__easydir)
    // }
    // console.log('getDir',__easydir)
    return __datadir
}

async function prepDirs(dir){
    try {
        var easyDir = await getDir(dir)
        var easyDBFiles = await readdirSync(easyDir)
        easyDBFiles = easyDBFiles.filter(x=>x.includes('.json') && !x.includes('.tmp')).map(y=>`${easyDir}/${y}`)
        var mapping = []
        await easyDBFiles.forEach(async (x)=>{
            mapping[x.split('/').at(-1).split('.')[0]] = x
    
        })
    } catch(err){
        console.log(`east-lowdb: prepdir  ${err}`)
    }
    // console.log('prepDir',mapping)
    return mapping




}

async function load(key,dir){
    try {
        // console.log('load', key, dir)
        var tempDict = {}
        var mapping = await prepDirs(dir)
        if(key && mapping[key]){
            tempDict[key] = new Low(new JSONFile(mapping[key]))
            await tempDict[key].read()
            tempDict[key].data||={}
            // console.log('load 1',Object.keys(tempDict))
            return tempDict
        } else if (Object.keys(mapping).length > 0) {
            for(var key in mapping){
                tempDict[key] = new Low(new JSONFile(mapping[key]))
                await tempDict[key].read()
                tempDict[key].data||={}
            }
            // console.log('load 2',Object.keys(tempDict))
            return tempDict
        } else if(key && !mapping[key]) {
            // console.log('load 3',key)
            return await addKey(key, {}, dir)
        } else {
            tempDict[key] = {data:{}}
            // console.log('load 4',Object.keys(tempDict))
            return tempDict
        }

    } catch(err){
        console.log('easy-lowdb', 'load', mapping,key, err)
        return null
    }

}

export async function help(){
    console.log(`Automatically creates the folder ${process.cwd()}/data/easy/`)
    console.log(`Read function only requires a keyword as an arguments`)
    console.log(`Write function only requires a keyword and data as arguments`)
    console.log(`EasyDB `)

}