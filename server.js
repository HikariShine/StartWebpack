// 使用webpack-dev-middleware插件。其实webpack-dev-server也是用的middleware实现的
// 不同之处在于dev-server使用更简单化，而middleware更开放，可定制性强。
// 对于dev-middleware的HMR(Hot Module Replacement)模块是webpack-hot-middleware
// dev-server的则是webpack.NamedModulesPlugin()和webpack.HotModuleReplacementPlugin插件

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
