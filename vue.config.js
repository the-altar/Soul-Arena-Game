module.exports = {
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(900000).maxAssetSize(900000);
    config.plugin("html").tap((args) => {
      args[0].title = "InGame — Soul Arena";
      return args;
    });
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(cur|ani)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  },
  outputDir: "/home/alola/Desktop/Soul-Arena/server/public/game/build",
  publicPath: "/",
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: "disabled",
    },
  },
  pwa: {
    name: "Soul-Arena",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    manifestOptions: {
      display: "fullscreen",
      orientation: "landscape",
    },
  },
};
