// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');
const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, 'client', 'index.jsx'),

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },     
        }
      }
    ],
  },

  // plugins: [
  //   new ExtractTextPlugin('style.css', { allChunks: true }),
  //   new ReactToHtmlPlugin('index.html', 'index.js', {
  //     static: true,
  //     template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
  //   })
  // ],

  mode: 'development', // change to production for optimized package
};