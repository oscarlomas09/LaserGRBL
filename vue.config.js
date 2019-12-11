// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ["serialport"]
    }
  }
};
