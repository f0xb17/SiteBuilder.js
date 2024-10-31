document.addEventListener('DOMContentLoaded', async () => {

    /**
     * This method returns the name for any HTML Tag, that was entered in the Config file. 
     * @param {*} name The name corresponds to the key in the JSON file. 
     *                  Of course, this usually refers to the name of the HTML tag 
     *                  that was previously defined in the HTML file. 
     * @returns Returns the value that replaces the key in the JSON file. Corresponds to the name of the HTML tag. 
     */
    async function targetClass(name) {
        try {
            if(!await getHTMLClass(name)) {
                throw new Errror('Key not found? Maybe Typo?')
            }
            return await getHTMLClass(name)
        } catch(err) {
            console.error('Error while searching key: ', err)
        }
    }

    const contentTarget = document.querySelector(`.${await targetClass('contentClass')}`)
    const navigationTarget = document.querySelector(`.${await targetClass('navigationClass')}`)
    
    /**
     * The function is intended to remove all HTML tags in an input so that no cross-site scripting can be carried out. 
     * @param {*} unsafe An input that may contain HTML tags. <
     * @returns Rhe cleaned output, without HTML tags. 
     */
    function sanitize(unsafe) {
        const doc = new DOMParser().parseFromString(unsafe, 'text/html')
        return doc.body.textContent || ''
    }

    /**
     * This method loads the content of an HTML file and replaces the original content in the target div with the content of the file. 
     * @param {*} file This is the file whose content is to be loaded.
     */
    async function loadContentFromFile(file) {
        try {
            const response = await fetch(file)
            if(!response.ok) {
                throw new Error('Network response failed!')
            }
            const html = await response.text()
            contentTarget.innerHTML = html
        } catch(err) {
            console.error('Fetch ended with an ERROR: ', err)
        }
    }

    /**
     * This method searches for the corresponding file in the folder using the parameter passed in the link. 
     */
    async function getParameterFromLink() {
        const urlParams = new URLSearchParams(window.location.search)
        const entryPoint = sanitize(urlParams.get('page'))

        await loadContentFromFile(`./site/${entryPoint}.htm`)
    }

    await getParameterFromLink()
})
