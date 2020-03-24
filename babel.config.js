module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'IE 11'],
          },
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    ignore: [
      // TODO move to webpack.config
      '**/node_modules',
      '**/dist',
      '**/__tests__',
      '**/__snapshots__',
      '**/__stories__',
      '**/*.test.ts*',
      '**/*.story.ts*',
    ],
    plugins: [
      '@babel/plugin-proposal-function-bind',
      // "@babel/plugin-syntax-class-properties",
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-styled-components',
    ],
  };
};
