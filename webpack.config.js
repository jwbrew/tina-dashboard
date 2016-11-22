var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: __dirname,
    filename: 'latest.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
      { test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react' }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'API_ENDPOINT': JSON.stringify('https://xqdw0lhxt8.execute-api.eu-west-1.amazonaws.com/dev'),
        'GA_ID': JSON.stringify('UA-86744824-2'),
        'PUSHER_KEY': JSON.stringify('c38cb22264e67692aec2'),
        'STRIPE_KEY': JSON.stringify('pk_test_pxS4daqqBphxJVYhaLDcFVQA'),
        'AUTH0_CLIENT_ID': JSON.stringify('7GZnCmh48eqL8hsyAaLE2JBhfuorxvqY'),
        'AUTH0_DOMAIN': JSON.stringify('tina-dev.eu.auth0.com')
      }
    })
  ]
};
