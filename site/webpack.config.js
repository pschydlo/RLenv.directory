const path = require('path');

module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  mode: 'development',
  entry: {
    app: './webpack/app.jsx',
    collections: './webpack/collections.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'assets/javascripts/')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
};

