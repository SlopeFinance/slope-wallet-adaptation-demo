module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 自动按需引入 vant 组件样式
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
