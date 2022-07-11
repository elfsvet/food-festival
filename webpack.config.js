const path = require('path');
const webpack = require('webpack');

module.exports = {
    // entry for webpack
    entry: './assets/js/script.js',
    // output for webpack
    output: {
        path: path.resolve(__dirname, 'dist'),
        // the file name is going to be main.bundle.js
        filename: 'main.bundle.js'
    },
    // mode for webpack to not let it run in production mode because it by default.
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode:'development'

};

// For a basic configuration, we need to provide webpack with three properties