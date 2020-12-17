const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ap-single-spa",
    projectName: "navbar",
    webpackConfigEnv,
  });


  const merged = webpackMerge.smart(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          use: [
            {
              loader: require.resolve("style-loader", { paths: [__dirname] }),
            },
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
    // customizations can go here
    devServer: {
      https: true,
      port: 9001
    },
  });

  // Override rule for handling css to enable CSS Modules
  // merged.module.rules.forEach((rule, ruleIndex) => {
  //   if (rule.test && rule.test.toString() === /\.css$/i.toString()) {
  //     rule.use.forEach((use, useIndex) => {
  //       if (use.loader.includes("css-loader")) {
  //         merged.module.rules[ruleIndex].use[useIndex].options.modules = true;
  //       }
  //     });
  //   }
  // });
  return merged;
};
