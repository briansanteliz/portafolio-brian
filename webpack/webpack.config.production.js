const path = require("path");
const assets = require("../src/assets");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        parallel: 4,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        parallel: 4,
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
  mode: "production",
  entry: { main: ["./src/index.js", "@babel/polyfill"] },
  output: {
    filename: "js/bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              useRelativePath: true,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
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
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        removeOptionalTags: true,
        removeTagWhitespace: true,
      },
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
  devtool: "source-map",
};
