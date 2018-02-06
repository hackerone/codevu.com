var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


const config = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.[contenthash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Lazy component',
            template: 'src/index.html'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    )
    // babelSettings.plugins.push("transform-react-inline-elements");
    // babelSettings.plugins.push("transform-react-constant-elements");

} else {
    config.devtool = "#cheap-module-source-map"
    config.devServer = {
        contentBase: './public',
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: "0.0.0.0",
        port: 2708,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;