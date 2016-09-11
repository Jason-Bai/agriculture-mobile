const webpack = require('webpack');

// 分析以下模块的共用代码, 单独打一个包到common.js
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');
// 单独打包CSS
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = function (options) {

  return {

    devServer: {
      // Enable history API fallback so HTML History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacePlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]

  }
};

exports.setupLoaders = function (paths) {

  return {

    module: {
      loaders: [
        {
          test: /\.js$/, loader: 'babel-loader', // ES6
          exclude: /(node_modules|libs|ppweb\\libs\\webpack|ppweb\/libs\/webpack)/
        },
        // CSS,LESS打包进JS
        //{ test: /\.css$/, loader: 'style-loader!css-loader' },
        //{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
        // CSS,LESS单独打包
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },

        { test: /\.tpl$/, loader: 'ejs' }, // artTemplate/ejs 's tpl
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader',
          query: {
            name: '[path][name].[ext]?[hash:8]',
            limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
          }
        }
      ]
    }

  };

};

exports.setUpResolve = function () {
  
  return {
    resolve: {
        // css的@import想要使用路径，需要在前端加~，比如 @import '~base2base/base.less'
        alias: {
            'lib0': '../../../libs', // 从module调用工程上公共lib库路径简写
            'lib1': '../../../../libs', // 从module的子文件夹调用工程上公共lib库路径简写
            'lib2': '../../../../../libs', // 从module的两层子文件夹调用工程上的公共lib库路径简写
            'base2base': '../../../../libs/base/' // 从extend/base中引用libs/base库路径
        },
        // 现在可以写 require('file') 代替 require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee']
    }
  };
  
};

exports.setUpPlugins = function () {
  return {
    plugins: [
        commonsPlugin,
        new ExtractTextPlugin('[name].css', { allChunks: true }), // 单独打包CSS

        // 全局变量，一定要用JSON.stringify()包起来
        new webpack.DefinePlugin({
            // __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')), //通过环境变量设置
            __DEV__: JSON.stringify(JSON.parse('false')), // 开发调试时把它改为true
            __MASK_WECHAT__: JSON.stringify('http://a.img.pp.cn/upload_files/2015/11/18/common/activity/mask/img_browser_download.png') // 微信环境下蒙层图片
        }),

        /**
         * HTML文件编译，自动引用JS/CSS
         * 
         * filename - 输出文件名，相对路径output.path
         * template - HTML模板，相对配置文件目录
         * chunks - 只包含指定的文件（打包后输出的JS/CSS）,不指定的话，它会包含生成的所有js和css文件
         * excludeChunks - 排除指定的文件（打包后输出的JS/CSS），比如：excludeChunks: ['dev-helper']
         * hash
         */
        new HtmlWebpackPlugin({ filename: 'index.html', template: 'src/modules/app/home/index.html', chunks: ['common', 'List'], hash: true }),
        new HtmlWebpackPlugin({ filename: 'list.html', template: 'src/modules/app/list/index.html', chunks: ['common', 'List'], hash: true }),
        new HtmlWebpackPlugin({ filename: 'detail.html', template: 'src/modules/app/detail/index.html', chunks: ['common', 'Detail'], hash: true })
    ]
  }; 
};