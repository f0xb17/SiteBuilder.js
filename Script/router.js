class Router {

    constructor() {
        this.routes = {}
        this.currentRoute = null
    }
    
    /**
     * Adds a new route to the router. 
     * @param {*} path - The path for the route
     * @param {*} callback - The function to call, when the route is accessed. 
     */
    addRoute(path, callback) {
        this.routes[path] = callback
    }
    
    /**
     * Loads the routes from the config.json file. 
     */
    async createRoutes() {
        try {

            const data = await loadJSON()
            const elementId = await await getValueFromKey('content')

            data.routes.forEach(route => {
                this.addRoute(route.entryPoint, async() => {
                    const contentResponse = await fetch(route.file)
                    const content = await contentResponse.text()
                    document.getElementById(elementId).innerHTML = content
                })
            })

        } catch (err) {
            console.log('Error while creating route: ', err)
        }
    }

    /**
     * Navigates to a specified route.
     * @param {*} path - The path to navigate to.
     */
    navigate(path)  {
        if (this.routes[path]) {
            this.currentRoute = path
            this.routes[path]()
            window.history.pushState({}, "", path) // - Update the browser URL. 
        } else {
            throw new Error(`Route ${path} not found.`)
        }
    }

    /**
     * Handles redirects on page laod
     */
    handleRedirect() {
        const path = window.location.pathname;
        if (this.routes[path]) {
            this.navigate[path]
        } else {
            // Defaults redirect to root if path is not found
            this.navigate('/')
        }
    }

}