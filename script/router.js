export class Router {
  constructor() {
    this.routes = {}
    this.errorRoute = '/error'
    this.content = null
    this.config = null
  }

  static async init(routes, content, config) {
    this.content = content
    this.config = config
    for (const path in routes) {
      this.routes = routes[path]
    }
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault()
        Router.navigate(e.target.href)
      }
    })
  }

  static async navigate(path) {
    if (this.routes) {
      console.log("Navigate to " + path)
      window.history.pushState({}, '', path)
      await this.content.create(this.config)
    } else {
      window.history.pushState({}, '', this.errorRoute)
    }
  }
}
