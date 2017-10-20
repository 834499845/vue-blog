// https://github.com/shelljs/shelljs
// 检查 node npm 版本
require('./check-versions')()
// 使用 shelljs 插件 可以让我们在 node 环境的js 中使用 shell
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
// 提示用户 需要连接 网络才可看到 负责为空白页
console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

// 拼接编译输出文件路径
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 删除这个文件夹 递归删除
rm('-rf', assetsPath)
// 常见此文件夹
mkdir('-p', assetsPath)
// 赋值static 文件夹到我们编译输出目录
cp('-R', 'static/*', assetsPath)
// 开始 webpack 的编译
webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
