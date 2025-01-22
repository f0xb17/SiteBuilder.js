export default class Content {
  constructor() {
    this.name = 'Content'
  }

  static async init(contentPath) {
    const response = await fetch(contentPath)
    try {
      if (!response.ok) {
        throw new Error(`Status: ${response.status}: ${response.statusText}`);
      }
      return await response.text()
    } catch (e) {
      console.error(e)
    }
  }

  static async create(config) {
    const path = Object.keys(config.get('Routes')).find((key) => config.get('Routes')[key].route === window.location.pathname)
    const contentPath = config.get('Routes')[path].content
    await Content.init(contentPath).then((content) => {
      console.log("Content created!")
      document.querySelector(config.get('Modules').Content.id).innerHTML = content
    })
  }
}
