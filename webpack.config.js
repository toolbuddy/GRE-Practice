const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    index: Path.resolve(__dirname, "src", "index"),
  },
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GRE Practice',
      template: 'src/index.ejs',
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use:[
          {
            loader: 'vue-loader',
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: Path.join(__dirname, 'build'),
    compress: true,
    port: 5000
  }
}