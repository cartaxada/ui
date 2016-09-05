var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var AWS_SDK_MAIN = require.resolve('aws-sdk/dist/aws-sdk.min');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: { 'aws-sdk$': AWS_SDK_MAIN }
  },

  module: {
    noParse: [ /aws-sdk/ ],
    loaders: [
      { test: /\.ts$/, loaders: ['ts'] },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]' },
      { test: /\.css$/, exclude: helpers.root('src', 'app'), loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
      { test: /\.css$/, include: helpers.root('src', 'app'), loader: 'raw' },
      { test: require.resolve(AWS_SDK_MAIN), loader: 'exports?AWS' }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'] }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        'USER_POOL_ID': JSON.stringify(process.env.USER_POOL_ID),
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'IDENTITY_POOL_ID': JSON.stringify(process.env.IDENTITY_POOL_ID),
        'DYNAMODB_TABLE': JSON.stringify(process.env.DYNAMODB_TABLE)
      }
    })
  ]
};
