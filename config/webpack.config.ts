import path from 'path';
import { Configuration } from 'webpack';
const PnpWebpackPlugin = require('pnp-webpack-plugin')
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const config: Configuration = {
  entry: path.resolve(__dirname, '..', 'src', 'server.ts'),
  mode: 'development',
  watch: true,
  target: 'async-node',
  stats: {
    warnings: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              // Reserve 1 cpu for ForkTsCheckerWebpackPlugin
              workers: require('os').cpus.length - 1,
              poolTimeout: Infinity
            }
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
              experimentalWatchApi: true,
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '..', 'build')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      PnpWebpackPlugin
    ]
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module)
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};

export default config;
