const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./build/webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: '/static/',
    quiet: true,
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, 'dist/static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8888);
