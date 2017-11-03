const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // sourceMappingUrl都会以//# sourceMappingURL=这种形式出现在js文件的末尾
  // 也可以使用dataUrl格式data:application/json;charset=utf-8;base64,
  // inline-source-map会把source-map已dataUrl的形式放在js文件末尾，
  // 解码出来之后一般是这样
  /* {"version":3,"sources":["webpack:///webpack/bootstrap 23352c57ec29b21680a9",
  "webpack:///./src/print.js","webpack:///./src/index.js",
  "webpack:///./node_modules/lodash/lodash.js",
  "webpack:///(webpack)/buildin/global.js",
  "webpack:///(webpack)/buildin/module.js"],"names":[],"mappings":""}
  */
  // 所以在开发者工具里看到，这几个文件是属于webpack://路径下的
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // 我们还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖。
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ],
};
