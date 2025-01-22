export class Core {
  async init() {
    const { Configuration } = await import('./config/config.js')
    Configuration.init().then(async () => {
      const { Modules } = await import('./modules.js')
      const modules = new Modules(Configuration)
      await modules.init()

      const { Router } = await import('./router.js')
      await Router.init(Configuration.get('Routes'), modules.modules.Content.default, Configuration).then(() => {
        Router.navigate(window.location.pathname)
      })
    })
  }
}

const core = new Core()
export default core
