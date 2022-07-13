const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    // entry for webpack
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    // output for webpack
    output: {
        path: path.resolve(__dirname, 'dist'),
        // the file name is going to be main.bundle.js
        filename: '[name].bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name(file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function (url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    // mode for webpack to not let it run in production mode because it by default.
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        }),
        // new is invoking a constructor function 
        // instantiate new wbpackpwa
        // provide an object 
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // specified the homepage
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // don't want to make an unique name
            fingerprints: false,
            // adds the link to manifest in html. we will hardcode it.
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: 'development'

};

// For a basic configuration, we need to provide webpack with three properties