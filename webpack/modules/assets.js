// Paths
import { source, statics } from '../paths';

// Plugins
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';

const Path = require('path');

export const loadFonts = () => ({
    module: {
        rules: [
            {
                test:    /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?$/,
                include: source,
                use:     {
                    loader:  'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
            }
        ],
    },
});

export const loadImages = () => ({
    module: {
        rules: [
            {
                test:    /\.jpe?g|png|svg$/,
                include: source,
                use:     {
                    loader:  'url-loader',
                    options: {
                        fallback: 'file-loader',
                        limit:    8192,
                        name:     'images/[name].[hash:5].[ext]',
                    },
                },
            }
        ],
    },
});

export const setupFavicon = () => ({
    plugins: [
        new FaviconsWebpackPlugin({
            logo:            './static/favicon/favicon.png',
            prefix:          'images/favicon/icon-[hash]',
            statsFilename:   'iconstats-[hash].json',
            persistentCache: true,
        })
    ],
});

export const setupHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            inject:   false,
            template: HtmlWebpackTemplate,
            title:    'JS Band Store ',
            favicon:  `${statics}/favicon/favicon.png`,
            meta:     [
                {
                    name:    'viewport',
                    content: 'user-scalable=no, width=device-width, initial-scale=1',
                }
            ],
            appMountIds: ['app', 'spinner'],
        })
    ],
});
