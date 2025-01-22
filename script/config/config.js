export class Configuration {

  constructor() {
    this.config = null
  }

  static async init() {
    try {
      const response = await fetch('./script/config/config.json');
      if (!response.ok) {
        throw new Error(`Status: ${response.status}: ${response.statusText}`);
      }
      const config = await response.json();
      if (config && typeof config === 'object') {
        console.log('Configuration loaded successfully!')
        this.config = config
      } else {
        throw new Error('Configuration cannot be loaded!')
      }
    } catch (e) {
      console.error(e)
    }
  }

  static get(key) {
    try {
      if (!this.config) {
        throw new Error('Configuration is not loaded!')
      }
      if (!(key in this.config)) { 
        throw new Error(`Key ${key} is not found in configuration!`)
      }
      return this.config[key]
    } catch (e) {
      console.error(e)
    }
  }

  static config() {
    return this.config
  }
}
