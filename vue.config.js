module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  // 修改 vant 的样式变量
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            blue: '#197DFF'
          }
        }
      }
    }
  }
}
