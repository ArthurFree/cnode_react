const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const postcssOpts = {
    ident: 'postcss',
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'Android >= 4']
        }),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ]
};

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
        publicPath: './static/',
    },

    resolve: {
        modules: [resolve('node_modules'), resolve('src')],
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
        alias: {
            'assets': resolve('./src/assets'),
            'actions': resolve('./src/actions'),
            'reducers': resolve('./src/reducers'),
            'actionType': resolve('./src/constants/actionType.js'),
            'utils': resolve('./src/utils'),
            'components': resolve('./src/components'),
            'constants': resolve('./src/constants')
        }
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
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.woff2(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.ttf(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.eot(\?t=\d+(#iefix)?)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.svg(\?t=\d+(#\w+)?)?$/,
                loader: "url-loader?limit=10000&minetype=image/svg+xml",
                include: resolve("./src/assets/iconfont")
            },
            // {
            //     test: /\.(svg)$/i,
            //     loader: 'svg-sprite-loader',
            //     include: [
            //         resolve('./src/assets/iconfont/iconfont.svg'),
            //     ]
            // },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
                    ]
                })
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', { loader: 'postcss-loader', options: postcssOpts }
                    ]
                })
            }
        ]
    },

    plugins: [],
}
