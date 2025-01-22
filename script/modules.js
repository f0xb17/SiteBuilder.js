export class Modules {
  constructor(config) {
    this.config = config
    this.modules = {}
  }

  async register() {
    for (const [key, value] of Object.entries(this.config.get('Modules'))) {
      if (value.visible) {
        this.modules[key] = await import(`./modules/${key.toLowerCase()}.js`)
      }
    }
  }

  async init() {
    await this.register().then(() => {
      for (const module of Object.values(this.modules)) {
        if (this.config.get('Modules')[module.default.name].visible) {
          module.default.create(this.config)
        }
      }
    }).catch((e) => console.error(e))
  }
}
