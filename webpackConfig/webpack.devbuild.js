const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const Visualizer = require('webpack-visualizer-plugin');
const { removeEmpty } = require('webpack-config-utils');

rimraf('./dist/hot/', [], console.error);

const config = () => {
  const outputPath = path.resolve(process.cwd(), 'dist');

  return {
    plugins: removeEmpty([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(outputPath, 'ReactLibs.json'),
      }),
      new Visualizer({ filename: './statistics.html' }),
    ]),
  };
};

module.exports = env => config(env);
