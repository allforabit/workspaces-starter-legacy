import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const config: Configuration = {
  entry: {
    'frontend-app': path.resolve(
      __dirname,
      '..',
      'frontend',
      'src',
      'app',
      'index.tsx'
    ),
    'frontend-server': path.resolve(
      __dirname,
      '..',
      'frontend',
      'src',
      'server',
      'server.ts'
    ),
    'flight-service': path.resolve(
      __dirname,
      '..',
      'services',
      'flight-service',
      'index.ts'
    ),
    'plantae-service': path.resolve(
      __dirname,
      '..',
      'services',
      'plantae-service',
      'index.ts'
    ),
    'user-service': path.resolve(
      __dirname,
      '..',
      'services',
      'user-service',
      'index.ts'
    ),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'build'),
  },
  mode: 'development',
  watch: false,
  node: {
    __dirname: true,
  },
  target: 'async-node',
  stats: {
    warnings: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'thread-loader',
            options: {
              // Reserve 1 cpu for ForkTsCheckerWebpackPlugin
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              workers: require('os').cpus.length - 1,
              poolTimeout: Infinity,
            },
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
              experimentalWatchApi: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['frontend-app'],
      inject: true,
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

export default config;
