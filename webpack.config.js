const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    backgroundScript: "./src/extension/backgroundScript.js",
    contentScript: "./src/extension/contentScript.js",
    devtools: "./src/extension/devtools.js",
    bundle: "./src/app/App.js",
    fiberTreeAnalyzer: "./package/createTree.js",
    containerWrapper: "./package/containerWrapper.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/app/index.html",
      filename: "index.html",
      chunks: ["bundle"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/extension/devtools.html",
      filename: "devtools.html",
      chunks: ["devtools"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/",
          to: "./assets/",
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    contentBase: "./dist",
  },
  devtool: "eval-source-map",
};
