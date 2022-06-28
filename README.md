# easy-lowdb
An extremely simple wrapper for lowdb. Will automatically manage the file and adapter operations of lowdb so you only have to worry about reading and writing. 

    import { Easy } from 'easy-lowdb'
    var key = 'string'// results in the name of the json file saved by lowdb
    var dir = process.cwd() + '/ez' // location to save and read json file
    var _db = new Easy(key, dir)
    
    if a json file exists tieh the name of 'key", it with load it and it will be accessible as _db.data
    //( Ex: If the key = 'pdf' it will load or create a file name ./ez/pdf.json )
  
    _db.data = data (or _db.data = Object.assign({}, data)  

    await _db.write()
    await _db.read()


