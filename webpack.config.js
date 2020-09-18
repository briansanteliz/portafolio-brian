const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: { main: ["./src/index.js", "@babel/polyfill"] },
  output: {
    filename: "js/bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  devServer:{
    hot:true,
    open:true,
    contentBase:path.join(__dirname, "dist"),
    compress:true,
    port:8080
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
          test:/\.html/i,
          loader:'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
       minify:{
           collapseWhitespace:true,
           removeComments:true,
           removeRedundantAttributes:true,
           removeScriptTypeAttributes:true,
           removeStyleLinkTypeAttributes:true,
           useShortDoctype:true,
           removeEmptyAttributes:true,
           removeAttributeQuotes:true,
           removeOptionalTags:true,
           removeTagWhitespace:true,
       }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    
  ],
  devtool: "eval-source-map",
};
