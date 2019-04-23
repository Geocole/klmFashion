const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const webpack = require('webpack');

mix.webpackConfig(webpack => {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules(?!\/foundation-sites)|bower_components/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: Config.babel()
                        },
                    ]
                },
                {
                    test: /\.styl$/,
                    use: [{
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'stylus-loader',
                    }],
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                    }],
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve('resources/assets/sass'),
                '@components': path.resolve('resources/assets/js/components'),
                '@mixins': path.resolve('resources/assets/js/mixins'),
                '@containers': path.resolve('resources/assets/js/containers'),
                '@images': path.resolve('ressources/images'),
                '@plugins': path.resolve('ressources/assets/js/plugins'),
                '@sass': path.resolve('ressources/assets/sass'),
                'jquery': path.join(__dirname, '/node_modules/jquery/dist/jquery.min.js'),
            }
        },
        output: {
            publicPath: '/',
            chunkFilename: 'js/[name].[chunkhash].js',
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'Popper': 'popper.js/dist/umd/popper'
            })
        ],
        externals: {
            jquery: 'jQuery'
        }
    };
})


mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
