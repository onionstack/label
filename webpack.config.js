var path = require('path');
var fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = [
    defaultsDeep({}, {}, {
        entry: {
            'lib.min': ['react', 'react-dom'],
            'gui': './src/index.jsx',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
            chunkFilename: 'chunks/[chunkhash].chunk.js'
        },
        externals: {
            React: 'react',
            ReactDOM: 'react-dom'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(svg|png|wav|gif|jpg)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/'
                    }
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    include: [path.resolve(__dirname, 'src'), /node_modules[\\/]src/],
                    options: {
                        // Explicitly disable babelrc so we don't catch various config
                        // in much lower dependencies.
                        babelrc: false,
                        plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-modules-commonjs"],
                        presets: [['@babel/env', { targets: { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] } }], '@babel/react']
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: [path.resolve(__dirname, 'src')],
                    options: {
                        // Explicitly disable babelrc so we don't catch various config
                        // in much lower dependencies.
                        babelrc: false,
                        plugins: [
                            "@babel/plugin-transform-runtime", "@babel/plugin-transform-modules-commonjs", "@babel/plugin-syntax-dynamic-import"
                        ],
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            camelCase: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: function () {
                                return [
                                    postcssImport,
                                    postcssVars,
                                    autoprefixer({
                                        overrideBrowserslist: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                                    })
                                ];
                            }
                        }
                    }]
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'lib.min'
            },
            runtimeChunk: {
                name: 'lib.min'
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['lib.min', 'gui'],
                template: 'src/index.ejs',
                title: 'Label V1.0.0',
                sentryConfig: null
            })
        ]
    })
];


