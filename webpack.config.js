const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    watchOptions : {
      poll: true
    },
    proxy: {
      '**': 'http://localhost:5000'
    },
    watchContentBase: true,
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    host: "localhost"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.scss']
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: 'bundle.js'
  },
  entry: path.resolve("./src/index.tsx"),
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader", 
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'resources/'
            }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "My city admin",
      template: "src/index.html"
    })
  ],
  devtool : "eval"
};