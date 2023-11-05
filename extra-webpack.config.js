const { InjectManifest } = require('workbox-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Add this line

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
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => {
                // Generate unique CSS filenames based on the chunk name
                return chunk.name === 'styles-4c120c8f' ? 'styles-4c120c8f.css' : 'styling.css';
            },
        }),
        // Other plugins...
    ]
}