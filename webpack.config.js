const path = require('path');
// const webpack = require('webpack');


module.exports = {
    entry: {
        index: `${__dirname}/p.js`
    },

	// entry: path.resolve(__dirname, '/index.js'),

	// 入口文件输出配置
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'compress.js',
        publicPath: '/'
    },

    devtool: 'eval',

    devServer: {
        contentBase: './',
        hot: true,
        port: 8888,
        inline: true,
        open: true
    },

    module: {
		// 加载器配置
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["env"]
                }
            }
        ]
    }

};
