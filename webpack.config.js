var Encore = require('@symfony/webpack-encore');

// keep the manifest.json values relative to the bundle public directory, as
// expected by the Asset\Package classes of the bridges
const relativeManifestValues = (options) => {
    options.publicPath = '';
};

// JoliMediaEasyAdminBundle
Encore
    .setOutputPath('./src/Bridge/EasyAdmin/public/')
    .setPublicPath('/bundles/jolimediaeasyadmin')
    .setManifestKeyPrefix('')
    .configureManifestPlugin(relativeManifestValues)
    // postcss-calc cannot parse CSS relative color syntax channels (e.g. calc(s + 3))
    .configureCssMinimizerPlugin((options) => {
        options.minimizerOptions = {
            preset: ['default', { calc: false }],
        };
    })
    .cleanupOutputBeforeBuild()
    .enableVersioning(true)
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('joli-media-easy-admin', './src/Bridge/EasyAdmin/assets/js/joli-media-easy-admin.js')
;
const easyAdminConfig = Encore.getWebpackConfig();
easyAdminConfig.name = 'easyAdminConfig';
Encore.reset();

// JoliMediaSonataAdminBundle
Encore
    .setOutputPath('./src/Bridge/SonataAdmin/public/')
    .setPublicPath('/bundles/jolimediasonataadmin')
    .setManifestKeyPrefix('')
    .configureManifestPlugin(relativeManifestValues)
    .cleanupOutputBeforeBuild()
    .enableVersioning(true)
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('joli-media-sonata-admin', './src/Bridge/SonataAdmin/assets/js/joli-media-sonata-admin.js')
;
const sonataAdminConfig = Encore.getWebpackConfig();
sonataAdminConfig.name = 'sonataAdminConfig';
Encore.reset();

// JoliMediaSyliusAdminBundle
Encore
    .setOutputPath('./src/Bridge/Sylius/public/')
    .setPublicPath('/bundles/jolimediasylius')
    .setManifestKeyPrefix('')
    .configureManifestPlugin(relativeManifestValues)
    .cleanupOutputBeforeBuild()
    .enableVersioning(true)
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('joli-media-sylius-admin', './src/Bridge/Sylius/assets/js/joli-media-sylius-admin.js')
;
const syliusConfig = Encore.getWebpackConfig();
syliusConfig.name = 'syliusConfig';
Encore.reset();

module.exports = [easyAdminConfig, sonataAdminConfig, syliusConfig];
