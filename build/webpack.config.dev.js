const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.base.js');

const rootPath = path.join(__dirname, '..');
const basePath = './tmpl';

let _cfg = Object.assign({}, webpackBaseConfig, {
    devtool: 'cheap-eval-source-map',
});

function getHtmlChunks() {
    return new HtmlWebpackPlugin({
        title: 'CNode',
        name: 'app',
        template: path.join(rootPath, basePath, 'index.html'),
        // filename: path.join(rootPath, 'index.html'),
        filename: path.join(rootPath, 'dist/index.html'),
        inject: true,
        chunks: ['commons', 'app']
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
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
    ])
    .concat(getHtmlChunks())


module.exports = _cfg;