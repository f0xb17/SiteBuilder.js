const pathToConfig = './../config/config.json'

/**
 * This method can read the content of a JSON file. 
 * @param {*} file Path to the JSON file
 * @returns The contents of a JSON file
 */
async function loadJSON(file) {
    try {
        const response = await fetch(file)
        if(!response.ok) {
            throw new Error('Response ended with status: NOT OK!')
        }
        return await response.json()
    } catch(err) {
        console.error('Error loading Config: ', err)
        throw err
    }
}

/**
 * This method uses the key to find the matching value in a JSON file. 
 * @param {*} key Represents the key of a JSON file
 * @returns Returns the value of the key.
 */
async function getHTMLClass(key) {
    try {
        const data = await loadJSON(pathToConfig)
        if(!data) {
            throw new Error('Error while reading config file!')
        }
        return await data[key]
    } catch(err) {
        console.error('Error while reading key: ', err)
        throw err
    }
}
