const webpack = require('webpack');

module.exports = {
  entry: [
    'react-dev-utils/webpackHotDevClient',
    __dirname + '/web/src/index.js',
  ],
  output: {
    path: __dirname + '/web/public',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: __dirname + '/web/public',
    hot: true,
    overlay: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
