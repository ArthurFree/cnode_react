const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {

    entry: {
        'app': [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            resolve('src/index')
        ]
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: resolve('dist/static'),
        publicPath: '/static/',
    },

    resolve: {
        modules: [resolve('node_modules'), resolve('src')],
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['transform-runtime', { ployfill: false }],
                    ],
                    presets: ['es2015', 'stage-0', 'react']
                },
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.woff(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff",
                include: path.join(__dirname, "./src/assets/iconfont")
            },
            {
                test: /\.woff2(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff",
                include: path.join(__dirname, "./src/assets/iconfont")
            },
            {
                test: /\.ttf(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream",
                include: path.join(__dirname, "./src/assets/iconfont")
            },
            {
                test: /\.eot(\?t=\d+(#iefix)?)?$/,
                loader: "file-loader",
                include: path.join(__dirname, "./src/assets/iconfont")
            },
            {
                test: /\.svg(\?t=\d+(#\w+)?)?$/,
                loader: "url-loader?limit=10000&minetype=image/svg+xml",
                include: path.join(__dirname, "./src/assets/iconfont")
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                include: [
                    path.resolve(__dirname, './src/assets/iconfont/iconfont.svg'),
                ]
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 'less-loader'
                    ]
                })
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            }
        ]
    },

    plugins: [],
}