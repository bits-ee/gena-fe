module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 80
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gena-fe/'
    : '/'
}
