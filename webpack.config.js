// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
  'react-native',
  'react-native-keyboard-aware-scroll-view',
  'react-native-vector-icons',
  'react-native-reanimated',
  'react-navigation',
  'react-native-web',
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));
const babelLoaderConfiguration = {
  // test: /\\\\.ts$|tsx?$/,
  test: /\.(tsx|jsx|ts|js)?$/,
  // exclude: ['node_modules/react-native-reanimated'],
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.tsx'), // Change this to your main App file
    // path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'components'),
    path.resolve(__dirname, 'helpers'),
    path.resolve(__dirname, 'layout'),
    path.resolve(__dirname, 'navigation'),
    path.resolve(__dirname, 'screens'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\\\\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};
const imageLoaderConfigurationOLD = {
  test: /\\\\.(gif|jpe?g|png)$/,
  // include: [path.resolve(__dirname, 'assets')],
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  // type: 'text/html',
};

const imageLoaderConfiguration = {
  test: /\.(ico|gif|jpe?g|png)$/,
  type: 'asset/resource',
};

const fontLoaderConfiguration = {
  test: /\.ttf$/,
  type: 'asset/resource',
  include: path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
};

const fontLoaderConfigurationOLD = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  // add .. to the path for node_modules
  include: path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw.bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      cssLoaderConfiguration,
      fontLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
