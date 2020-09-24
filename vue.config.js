module.exports = {
  configureWebpack: {
    target: "electron-renderer"
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'msw.yuuko-amamiya',
        win: {
          icon: 'public/windows.ico'
        },
        productName: "Minori SoulWorker Launcher",
        publish: {
          provider: "github",
          owner: "MinoriSoulWorker",
          repo: "launcher",
          releaseType: "release"
        }
      }
    }
  }
};
