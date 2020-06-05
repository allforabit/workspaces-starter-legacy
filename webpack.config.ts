import path from 'path';
import { Configuration } from 'webpack';
const PnpWebpackPlugin = require('pnp-webpack-plugin')

const config: Configuration = {
  entry: path.resolve(__dirname, 'src', 'server.ts'),
  mode: 'development',
  target: 'async-node',
  stats: {
    warnings: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            configFile: 'tsconfig.json'
          }
        }
      }
    ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
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
  }
};

export default config;
