// vue.config.js
const TransformPages = require('uni-read-pages')

const { webpack } = new TransformPages()
module.exports = {
  transpileDependencies: ['uview-ui'],
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'http://183.252.15.157:9124/',
      //   // target: 'http://192.168.95.61:8124/',
      //   pathRewrite: { '^/api': '' },
      // },
      '/api': {
        // target: 'http://192.168.97.25:9124',
        // target: 'https://prejcgl.fjecloud.com:58740/api/', // 测试
        // target: ` https://itable.ywicc.edu.cn/api/`, // 义乌
        target: `http://183.252.15.157:13007/api`, // 外网测试
        pathRewrite: { '^/api': '' },
        ws: false,
        changeOrigin: true,
      },
      // 文件服务器反向代理
      '/fileApi': {
        target: 'http://183.252.15.157:13007/fileApi',
        // target: `http://183.252.15.157:13007/fileApi`,
        pathRewrite: { '^/fileApi': '' },
        ws: false,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'meta', 'aliasPath'],
          })
          return JSON.stringify(tfPages.routes)
        }, true),
      })
    ],
  },
}
