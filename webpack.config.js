const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    backgroundScript: './src/extension/backgroundScript.js',
    contentScript: './src/extension/contentScript.js',
    devtools: './src/extension/devtools.js',
    bundle: './src/app/App.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/app/index.html',
      filename: 'index.html',
      chunks: ['bundle'],
    }),
    new HtmlWebPackPlugin({
      template: './src/extension/devtools.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
    })
  ],
  devServer: {
    contentBase: './dist',
  },
  devtool: 'eval-source-map',
};
