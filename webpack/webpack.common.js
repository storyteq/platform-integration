const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
