const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',

  entry: {
    app: path.resolve(__dirname, 'assets/app.js'), // Your entry file
  },

  output: {
    path: path.resolve(__dirname, 'var/input/assets/javascripts'),
    filename: 'joli-media-documentation.bundle.min.js',
    library: 'JoliMediaDocumentationBundle',
    libraryTarget: 'umd', // Universal Module Definition
    umdNamedDefine: true,
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "../stylesheets/joli-media-documentation.bundle.min.css",
    }),
  ],

  resolve: {
    modules: ['node_modules'],
  },
};
