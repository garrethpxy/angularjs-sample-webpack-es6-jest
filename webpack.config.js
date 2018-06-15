const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '../'
                })
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
        new ExtractTextPlugin('css/style.css')
    ]
}
