var Encore = require('@symfony/webpack-encore');

// JoliMediaEasyAdminBundle
Encore
    .setOutputPath('./src/Bridge/EasyAdmin/public/')
    .setPublicPath('./')
    .setManifestKeyPrefix('')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(false)
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
    .setPublicPath('./')
    .setManifestKeyPrefix('')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(false)
    .enableVersioning(true)
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('joli-media-sonata-admin', './src/Bridge/SonataAdmin/assets/js/joli-media-sonata-admin.js')
;
const sonataAdminConfig = Encore.getWebpackConfig();
sonataAdminConfig.name = 'sonataAdminConfig';
Encore.reset();

module.exports = [easyAdminConfig, sonataAdminConfig];
