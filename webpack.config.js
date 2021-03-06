const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  console.log('env', env);
  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
        },
        {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { 
            loader: 'css-loader',
            options: {
              modules: true,  // we need to set module option for css-loader to be true. 
              importLoaders: 1, // The importLoaders option configures how many loaders before css-loader should be applied. For example, sass-loader would have to come before css-loader.
              localIdentName: "[name]_[local]_[hash:base64]", //see ****EXPLANATION***
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpeg|jpg|JPG|png|gif|PNG)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public/dist'),
      historyApiFallback: true,
      hot:true,
      watchContentBase: true,
    },
    performance: {
      hints: false
    }
  };
  
}
