export default class Navigation {
  constructor() {
    this.name = 'Navigation'
  }
  
  static async init(routes) {
    const ul = document.createElement('ul')
    for (const [key, value] of Object.entries(routes)) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      console.log("Found route = " + value.route)
      a.href = value.route
      a.textContent = key
      li.appendChild(a)
      ul.appendChild(li)
    }
    return ul
  }

  static async create(config) {
    await Navigation.init(config.get('Routes')).then((navigation) => {
      console.log("Navigation created!")
      document.querySelector(config.get('Modules').Navigation.id).appendChild(navigation)
    })
  }
}
