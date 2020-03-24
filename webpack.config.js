/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const { getIfUtils } = require('webpack-config-utils');
const devserverConfig = require('./webpackConfig/webpack.devserver');
const devbuildConfig = require('./webpackConfig/webpack.devbuild');
const prodbuildConfig = require('./webpackConfig/webpack.prod');

const baseConfig = env => {
  const outputPath = path.resolve(__dirname, 'dist');
  const { ifProd, ifNotProd } = getIfUtils(env);
  const output = {
    filename: 'bundle.js',
    path: outputPath,
    pathinfo: ifNotProd(),
    publicPath: '',
  };

  return {
    mode: ifProd('production', 'development'),
    context: __dirname,
    entry: './src/index.tsx',
    output,
    module: {
      rules: [
        {
          enforce: 'pre',
          use: ['stylelint-custom-processor-loader', 'eslint-loader'],
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
        },
        {
          use: ['babel-loader'],
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/, /\.test\./], // ? Duplicated in babel.config.js
        },
        {
          use: [
            {
              loader: 'html-loader',
              options: { minimize: ifProd() },
            },
          ],
          test: /\.html$/,
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, // Default fallback to file-loader
              },
            },
          ],
          include: [
            path.resolve(__dirname, 'assets/icons'),
            path.resolve(__dirname, 'assets/images'),
          ],
        },
        // {
        //   use: 'file-loader',
        //   test: /\.(eot|woff2|woff|ttf|otf|svg)/,
        //   include: [path.resolve(__dirname, 'assets/fonts')],
        // },
      ],
    },
    devtool: ifNotProd('source-map'),
    optimization: {
      noEmitOnErrors: true,
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'assets/'),
        components: path.resolve(__dirname, 'src/components/'),
        screens: path.resolve(__dirname, 'src/screens/'),
        src: path.resolve(__dirname, 'src/'),
        styles: path.resolve(__dirname, 'src/styles/'),
        utils: path.resolve(__dirname, 'src/utils/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      symlinks: true,
    },
    bail: true,
    stats: {
      colors: true,
    },
  };
};

module.exports = env => {
  if (env.dev === 'HMR') {
    return merge(baseConfig(env), devserverConfig(env));
  }
  if (env.dev) {
    return merge(baseConfig(env), devbuildConfig(env));
  }
  if (env.prod) {
    return merge(baseConfig(env), prodbuildConfig(env));
  }
  return baseConfig(env);
};
