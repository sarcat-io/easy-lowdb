import {readdirSync, mkdirSync, existsSync, writeFileSync} from 'fs'
import { Low, JSONFile } from 'lowdb'

export async function read(key){
    var temp = await load()
    if (!key){
        return temp
    } else if(!temp[key]){
        temp = await addKey(key)
        return temp[key].data
    } else {
        return temp[key].data
    }
}

export async function write(dbKey,data){
    var tempDict = await load()
    if(!tempDict[dbKey]){
        tempDict = await addKey(dbKey)
    }
    tempDict[dbKey].data = data
    await tempDict[dbKey].write()
    return true
}
async function addKey(key){
    var easyDir = await getDir()
    var tempDict = await load()
    tempDict[key] = new Low(new JSONFile(`${easyDir}/${key}.json`))
    await tempDict[key].read()
    tempDict[key].data||={}
    return tempDict
}

async function getDir(){
    const __datadir = `${process.cwd()}/data`
    if(!existsSync(__datadir)){
        mkdirSync(__datadir)
    }
    var dataDir = await readdirSync(__datadir)

    const __easydir = `${process.cwd()}/data/easy`
    if(!existsSync(__easydir)){
        mkdirSync(__easydir)
    }
    return __easydir
}

async function prepDirs(){
    var easyDir = await getDir()
    var easyDBFiles = readdirSync(easyDir)
    easyDBFiles = easyDBFiles.filter(x=>x.includes('.json')).map(y=>`${easyDir}/${y}`)
    return easyDBFiles
}

async function load(){
    var fileList = await prepDirs()
    var dbList= fileList.map(x=>x = x.split('/').at(-1).split('.')[0])
    var tempDict = {}
    if(dbList.length > 0){
        for(var i=0;i<dbList.length;i++){
            tempDict[dbList[i]] = new Low(new JSONFile(fileList[i]))
            await tempDict[dbList[i]].read()
            tempDict[dbList[i]].data||={}
        }
    }
    return tempDict
}

export async function help(){
    console.log(`Automatically creates the folder ${process.cwd()}/data/easy/`)
    console.log(`Read function only requires a keyword as an arguments`)
    console.log(`Write function only requires a keyword and data as arguments`)
    console.log(`EasyDB `)

}