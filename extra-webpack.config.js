var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 9,
            maxInitialRequests: 19,
            maxAsyncRequests: 29,
            minSize: 80000,
            maxSize: 120000,
            enforceSizeThreshold: 119999,
        }
    }, plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            showErrors: true,
        })
    ]
}