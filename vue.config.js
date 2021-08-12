module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  devServer: {
    host: "localhost",
    port: 80,
  },
  publicPath: "/",
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Gemeinde Online'
    }
  }
}
