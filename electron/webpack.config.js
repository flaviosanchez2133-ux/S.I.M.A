const path = require('path');

module.exports = function (env, argv) {
  const isDevelopment = argv.mode !== 'production';

  return {
    target: 'electron-renderer',
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: './'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
          type: 'asset/resource'
        }
      ]
    },
    devtool: isDevelopment ? 'source-map' : false
  };
};
