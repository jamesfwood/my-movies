var webpack = require('webpack');
const path = require('path');

// Is the current build a development build
var IS_DEV = true; //(process.env.NODE_ENV === 'dev');
var dirApp = path.join(__dirname, 'app');
//var dirAssets = path.join(__dirname, 'assets');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!tether/dist/js/tether.min.js',
    'script-loader!bootstrap/dist/js/bootstrap.min.js',
    'app/styles/app.scss',
    'app/index.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        TMDB_API_KEY: JSON.stringify(process.env.TMDB_API_KEY)
      }
    })
  ],
  output: {
    path: __dirname,
    filename: 'public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      app: 'app',
 //     applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
 //     applicationStyles: 'app/styles/app.scss',
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets:['react', 'es2015', 'stage-0'] }
        }],
      },
      // STYLES
      {
          test: /\.css$/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: IS_DEV
                  }
              },
          ]
      },

      // CSS / SASS
      {
          test: /\.scss/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: IS_DEV
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: IS_DEV,
                      includePaths: [ dirApp, path.resolve(__dirname, './node_modules/bootstrap/scss') ]
                  }
              }
          ]
      },

      
      // Bootstrap 4
 //     { 
 //       test: /bootstrap\/dist\/js\/umd\//, 
  //      use: 'imports-loader?jQuery=jquery' 
 //     }
    
      // Loaders for other file types can go here
    ],
  },
  devtool: 'cheap-module-eval-source-map'//,
  //plugins: [
 //    extractSass
  //]
};
