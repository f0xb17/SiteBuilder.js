document.addEventListener('DOMContentLoaded', async () => {

    const router = new Router()
    
    await router.createRoutes()
    router.handleRedirect()

    // Auto redirect to root if path is empty or index.htm
    const path = window.location.pathname;
    if (path === '/' || path == '/index.htm') {
        router.navigate('/')
    }
    
    /**
     * Adds an event listener to each anchor element (<a>) on the page. 
     */
    document.querySelectorAll('a').forEach(anchor => {
        /**
         * Handles the click event for an achor element.
         */
        anchor.addEventListener('click', (event) => {
            // Prevent the default behavior for that element!
            event.preventDefault()
            router.navigate(anchor.getAttribute('href'))
        })
    })

    /**
     * Adds an event listener for the 'popstate' event.
     */
    window.addEventListener('popstate', () => {
        // Calls the router's navigate method with the current path to update the view.
        router.navigate(window.location.pathname)
    })
})