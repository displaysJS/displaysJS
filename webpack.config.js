const path = require('path');
const webpack = require('webpack');

var createVariants = require('parallel-webpack').createVariants;

var baseOptions = {
    devtool: 'eval'
};

var variants = {
    minified: [true, false],
    debug: [true, false],
    target: ['var', 'commonjs2', 'umd', 'amd']
};

module.exports = createVariants(baseOptions, variants, (options) => {
    var plugins = [];

    if(options.minified) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }));
    }

    return {
        entry: {
          Displays: ['./src/components.js'],
          DisplayCoordinator: ['./src/display_coordinator.js'],
          Display: ['./src/display.js'],
          Timeline: ['./src/timeline.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename:  options.target + '/[name]' +
                (options.minified ? '.min' : '') +
                (options.debug ? '.debug' : '')
                + '.js',
            libraryTarget: options.target,
            library: '[name]'
        },
        module: {
         loaders: [{
             test: /\.js$/,
             loaders: [
                { loader: 'babel-loader' }
              ]
         }]
        },
        plugins: plugins
    };
});
