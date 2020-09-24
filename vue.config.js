module.exports = {
  configureWebpack: {
    target: "electron-renderer"
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'soulworker.minori',
        productName: "Minori SoulWorker Launcher",
        win: {
          icon: 'public/favicon.ico',
          target: {
            target: 'nsis',
            arch: [
              'x64',
              'ia32'
            ]
          }
        },
        publish: {
          provider: "github",
          owner: "MinoriSoulWorker",
          repo: "launcher",
          releaseType: "release",
          publishAutoUpdate: true
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
};
