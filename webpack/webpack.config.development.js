const path = require("path");
const assets = require("../src/assets");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { main: ["./src/index.js", "@babel/polyfill"] },
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "img/",
          publicPath: "img/",
          useRelativePath: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.html/i,
        loader: "html-loader",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: assets.map((asset) => {
        return {
          from: path.resolve(__dirname, `../node_modules/${asset}`),
          to: path.resolve(__dirname, "../src/libs"),
        };
      }),
    }),
  ],
  devtool: "eval-source-map",
};
