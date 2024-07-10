const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@store', path.resolve(__dirname, 'src/store'));
    // Diğer alias tanımlamaları buraya eklenebilir
  }
};