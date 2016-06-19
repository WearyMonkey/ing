var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin("bundle.css");

module.exports = {
  entry: ["js/app.js"],
  context: __dirname + "/www",
  output: {
    path: path.join(__dirname, 'www'),
    filename: "bundle.js",
    publicPath: ""
  },
  resolve: {
    root: __dirname + '/www'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['baggage?[file].html=bgTemplateUrl&[file].scss']
    }],
    loaders: [
      {
        test: /\.scss$/,
        loader: extractCSS.extract("raw!sass?sourceMap")
      },
      {
        test: /\.html$/,
        loader: "raw"
      }
    ]
  },
  devtool: "eval",
  plugins: [
    extractCSS
  ]
};
