const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  //指定打包的入口文件
  mode: "production",
  entry: "./index.js",
  //指定打包后的资源位置
  output: {
    //公共路径设置
    //publicPath: "https://cdn.baidu.com",
    path: path.resolve(__dirname, "./build"),
    filename: '[name].[contenthash].js'
  },

  module: {
    //遇到不认识的模块就在这里找loader解决
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          //url-loader 可以限定模块的体积，根据体积判断是否需要转换成base64,减少http请求
          loader: "url-loader", //file-loader就是把模块，放在另外一个目录里，并且把位置返回给我们,第三方字体
          options: {
            //   name是打包前模块的名称，ext是打包前的模块格式
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 15500
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/, //loader是有执行顺序，从后往前
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "JULIA FRACTAL"
      //   filename: "app.html"
    }),
    //在打包之前，先帮我们把生成目录删除一下
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CircularDependencyPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: "./build",
    open: true,
    port: "8081",

  },

  optimization: {

    runtimeChunk: 'single',

    splitChunks: {

        chunks: 'all', // 默认 async 可选值 all 和 initial

        maxInitialRequests: Infinity, // 一个入口最大的并行请求数

        minSize: 0, // 避免模块体积过小而被忽略

        minChunks: 1, // 默认也是一表示最小引用次数

        cacheGroups: {

            vendor: {

                test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称

                name(module, chunks, chcheGroupKey) { // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值

                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称

                    return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除

                }

            }

        }

    }

}
};
