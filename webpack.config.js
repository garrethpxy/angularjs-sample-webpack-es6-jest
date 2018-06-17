const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ConcatPlugin = require('webpack-concat-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const devMode = process.env.NODE_ENV !== 'production'
const devMode = true;

const LEGACY_SRC_ROOT = './src/legacy';
const LEGACY_OUTPUT_FOLDER = 'legacy-tpls'; // relative to contentBase folder

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.join(__dirname, "build/"),
        filename: "bundle.js"
    },
    mode: 'development',
    devServer: {
        contentBase: 'build',
        overlay:true,
        hot: true,
        watchContentBase: true
    },
    module: {
        strictExportPresence: true,
        rules: [
            // Load raw HTML files for templates
            { test: /\.(html)$/, loader: "raw-loader" },
            // Load js files through Babel
            { test: /\.(js|jsx)$/,   loader: "babel-loader" },
            // Load SCSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // note: MiniCssExtractPlugin extracts inline styles into their own css stylesheet
                    // later, it is automatically linked into the html index file by HtmlWebpackPlugin
                    // we use MiniCssExtractPlugin only in production
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader', //TODO: decide if this is needed
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            // Expose JQuery on the window object
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    plugins: [
        // Clean the build folder
        new CleanWebpackPlugin(['build']),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: "src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // Enable Named Modules
        new webpack.NamedModulesPlugin(),
        // Enable HMR
        new webpack.HotModuleReplacementPlugin(),
        // Concat all legacy JS files. inserts into index.html automatically via HtmlWebPlugin
        new ConcatPlugin({
            filesToConcat: [`${LEGACY_SRC_ROOT}/**/*.js`],
            injectType: 'append'
        }),
        // Copy all legacy tempate HTML files into predefined output folder
        // Also watches for changes on the files and emits new files when changes are detected
        new CopyWebpackPlugin([
            {
                from: `${LEGACY_SRC_ROOT}/**/*.html`,
                to: `${LEGACY_OUTPUT_FOLDER}/`,
                flatten: true
            },
        ]),
        // Force webpack-dev-server to write to filesystem instead of serving from memory
        // This is needed so that CopyWebpackPlugin will work as expected
        new WriteFilePlugin()
    ]
}
