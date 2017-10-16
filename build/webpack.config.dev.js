const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
const webpackBaseConfig = require('./webpack.config.base.js');

const rootPath = path.join(__dirname, '..');
const basePath = './tmpl';

let _cfg = Object.assign({}, webpackBaseConfig, {
    devtool: 'cheap-eval-source-map',
});

_cfg.module.rules = [{
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
        formatter,
    }
}].concat(_cfg.module.rules);

function getHtmlChunks() {
    return new HtmlWebpackPlugin({
        title: 'CNode',
        name: 'app',
        template: path.join(rootPath, basePath, 'index.html'),
        // filename: path.join(rootPath, 'index.html'),
        filename: path.join(rootPath, 'dist/index.html'),
        inject: true,
        chunks: ['commons', 'app'],
        headerScript: ['/static/lib/viewport.min.js'],
    })
}

_cfg.plugins = webpackBaseConfig.plugins
    .concat([
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                eslint: {
                    emitError: true,  // 验证失败，终止
                    configFile: '.eslintrc.js'
                }
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                "NODE_ENV": JSON.stringify('dev')
            }
        }),
        new CopyWebpackPlugin([
            {
              from: path.join(rootPath, 'src/lib'),
              to: path.join(rootPath, 'dist/static/lib')
            },
        ])
    ])
    .concat(getHtmlChunks())


module.exports = _cfg;
