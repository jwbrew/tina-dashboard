var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
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
        'API_ENDPOINT': JSON.stringify('https://xqdw0lhxt8.execute-api.eu-west-1.amazonaws.com/production'),
        'GA_ID': JSON.stringify('UA-77423943-6'),
        'NODE_ENV': JSON.stringify('production'),
        'PUSHER_KEY': JSON.stringify('01b5ea6fee2db45dce20'),
        'STRIPE_KEY': JSON.stringify('pk_live_OIg9BXltxpo6w0YFNkRD5UO0'),
        'AUTH0_CLIENT_ID': JSON.stringify('3AXqpUYlI23EEMc7tc9i0UwqfgNoWJKD'),
        'AUTH0_DOMAIN': JSON.stringify('tina.eu.auth0.com')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
};
