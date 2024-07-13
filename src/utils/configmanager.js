class ConfigManager {
    constructor(initialConfig = {}) {
      this.config = { ...initialConfig };
    }
  
    getConfig() {
      return this.config;
    }
  
    updateConfig(newConfig) {
      this.config = { ...this.config, ...newConfig };
    }
  
    getConfigValue(key) {
      return this.config[key];
    }
  
    setConfigValue(key, value) {
      this.config[key] = value;
    }
  }
  
  export default ConfigManager;