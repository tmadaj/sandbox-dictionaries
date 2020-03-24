const webpack = require('webpack');
const path = require('path');
const { removeEmpty } = require('webpack-config-utils');
const CompressionPlugin = require('compression-webpack-plugin');

const config = () => {
  const outputPath = path.resolve(process.cwd(), 'dist');

  return {
    optimization: {
      minimize: true, // TODO: terser-webpack-plugin
    },
    plugins: removeEmpty([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(outputPath, 'ReactLibs.json'),
      }),
      new CompressionPlugin(),
    ]),
  };
};

module.exports = env => config(env);
