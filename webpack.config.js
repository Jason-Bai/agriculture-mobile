var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var Debug = process.env.DEBUG || true;

module.exports = {
    entry: {
        vendor: [
            'zepto/dist/zepto.min.js'
        ],
        Home: './src/modules/app/home/index.js',
        List: './src/modules/app/list/index.js',
        Detail: './src/modules/app/detail/index.js'
    },
    output: {
        path: './release',
        publicPath: './',
        filename: '[name].js',
        chunkFilename: "[id].chunk.js?[hash:8]"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'zepto'
        }),
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        // 全局变量，一定要用JSON.stringify()包起来
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(Debug)),
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
        new HtmlWebpackPlugin({ filename: 'index.html', template: 'src/modules/app/home/index.html', chunks: ['vendor', 'Home'], hash: true })
        /*,
        new HtmlWebpackPlugin({ filename: 'list.html', template: 'src/modules/app/list/index.html', chunks: ['vendor', 'List'], hash: true }),
        new HtmlWebpackPlugin({ filename: 'detail.html', template: 'src/modules/app/detail/index.html', chunks: ['vendor', 'Detail'], hash: true })*/
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|libs|ppweb\\libs\\webpack|ppweb\/libs\/webpack)/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') 
            }, { 
                test: /\.tpl$/, 
                loader: 'ejs' 
            }, {
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader',
                query: {
                    name: '[path][name].[ext]?[hash:8]',
                    limit: 8192
                }
            }
        ]
    },
    resolve: {
        alias: {
            'components': '../../components'
        },
        extensions: ['', '.js', '.json', '.coffee']
    }
};