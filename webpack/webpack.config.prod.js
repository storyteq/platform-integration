const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Path = require('path');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'info',
  bail: true,
  entry: Path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'index.js',
    globalObject: 'this',
    library: {
      name: '@storyteq/platform-integration',
      type: 'umd',
    },
  },
  externals: {
    'lodash-es': {
      commonjs: 'lodash-es',
      commonjs2: 'lodash-es',
      amd: 'lodash-es',
      root: '_',
    },
  },
});
