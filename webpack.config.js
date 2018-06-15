const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const devMode = process.env.NODE_ENV !== 'production'
const devMode = true;

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.join(__dirname, "build/"),
        filename: "bundle.js"
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
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  // 'postcss-loader',
                  'sass-loader',
                ],
              }
        ]
    },
    plugins: [
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
        })
    ]
}
