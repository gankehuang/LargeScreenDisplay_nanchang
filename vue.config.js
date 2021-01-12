const path = require('path')
require('events').EventEmitter.defaultMaxListeners = 0

const IS_PROD = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  lintOnSave: false,
  css: {
    sourceMap: !IS_PROD
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: config => {
    if (IS_PROD) {
    }
  },
  devServer: {
    https: !IS_PROD,
    proxy: {
      '/group1': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/qfqzVisualization": "/qfqzVisualization-manage-server/qfqzVisualization",
        // },
      },
      '/qfqzVisualization': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/qfqzVisualization": "/qfqzVisualization-manage-server/qfqzVisualization",
        // },
      },

      '/carManage': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/carManage": "/car-manage",
        // },
      },

      '/api': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/api": "/api/web/communitywanli"
        // },
      },

      '/oauth': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/oauth": "/AUTH-SERVER/oauth",
        // },
      },

      '/token': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/token": "/USER-CENTER",
        // },
      },

      '/ajax': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/ajax": "/cloud-service"
        // },
      },

      '/iot': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/iot": "/MIT-IOT"
        // }
      },

      '/event': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/event": "/EVENT-HANDLING/event"
        // }
      },

      '/voice': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/voice": "/possecu_cs",
        // },
      }
    }
  },
  chainWebpack: config => {
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true)

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin('html').tap(args => {
    //   // 修复 lazy loading routes error
    //   args[0].chunkssortmode = 'none'
    //   return args
    // })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 加载本地pdf文件
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.pdf|ico$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        limit: 10000
      })
  }
}
