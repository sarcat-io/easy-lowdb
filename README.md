# easy-lowdb
An extremely simple wrapper for lowdb. Will automatically manage the file and adapter operations of lowdb so you only have to worry about reading and writing. 

    import { read, write } from 'easy-lowdb'
    
    // Provide a string or number to use as a name for the data
    // Results in a JSON file 
    var key = 'string' 
	
	// provide data you want to save
    var data = 'anything'
    
    // Write the data
    await write(key, data)
    
    // Read the data by simply using the same key name
    var readData = await ready(key)


Behind the scenes it uses JSON files named the same as the keys provided.

