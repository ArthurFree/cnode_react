const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    devtool: 'cheap-eval-source-map',

    entry: {
        'index': [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            resolve('src/index')
        ]
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: resolve('dist'),
        publicPath: '/dist/',
    },

    resolve: {
        modules: ['node_modules', resolve('src')],
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    },
}