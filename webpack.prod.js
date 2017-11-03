const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
// 我们鼓励你在生产环境中启用 source map
// 因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。
// 虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 devtool）。
// 对于本指南，我们将在生产环境中使用 source-map 选项，而不是我们在开发环境中用到的 inline-source-map
module.exports = merge(common, {
  // 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。
    // 例如，当不处于生产环境中时，某些 library 为了使调试变得容易，
    // 可能会添加额外的日志记录(log)和测试(test)。
    // 其实，当使用 process.env.NODE_ENV === 'production' 时，
    // 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
    // 我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
    // 因为webpack是代码解析编译，相当于文本替换，所以这里这种方式其实是直接替换了源码里的
    // process.env.NODE_ENV字符串为后面的值，所以要用"'production'"
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    // 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。
    // 通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。
    // 然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，
    // 将 process.env.NODE_ENV 设置为 "production"，请查看 #2537(https://github.com/webpack/webpack/issues/2537)。
    // 因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'
    // 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。
    // 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量。
    // 也就是说文件分两部分，一部分是编译时需要的启动文件和配置文件，一部分是被编译文件。
    // 环境配置只对编译时的启动文件有效，对于被编译文件肯定是无效的。这个插件的作用就是动态替换被编译文件中的环境文本。
  ]
});
