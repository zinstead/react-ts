const path = require('path');
const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const threads = os.cpus().length - 1;
// const isProduction = process.env.NODE_ENV === "production";

function getStyleLoader(preLoader) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [['postcss-preset-env']],
        },
      },
    },
    preLoader,
  ].filter(Boolean);
}

module.exports = {
  // 入口用相对路径
  entry: './src/index.tsx',
  // 输出用绝对路径
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    // // 入口文件的输出路径
    filename: 'static/js/[name].js',
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    // // 清除上一次打包的内容
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            // 从右往左
            use: getStyleLoader(),
          },
          {
            test: /\.less$/i,
            use: getStyleLoader('less-loader'),
          },
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/i,
            type: 'asset',
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(tsx?|js)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  plugins: ['@babel/plugin-transform-runtime'],
                },
              },
              {
                // babel开启多进程打包
                loader: 'thread-loader',
                options: {
                  workers: threads,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: threads,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      cache: true,
      // eslint开启多进程打包
      threads: threads,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'), // 将 `@/` 映射到 `src` 目录
    },
  },
};
