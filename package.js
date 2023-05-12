Package.describe({
    name: 'pwix:env-settings',
    version: '1.2.3-rc',
    summary: 'Autoload settings (YAML, JSON) for server and client from private assets based on NODE_ENV.',
    git: 'https://github.com/trychlos/pwix-env-settings',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'pwixEnvSettings',
        'PES_VERBOSE_NONE',
        'PES_VERBOSE_CONFIGURE',
        'PES_VERBOSE_READY',
        'PES_VERBOSE_STARTUP_MARK',
        'PES_VERBOSE_STARTUP_DUMP',
        'PES_VERBOSE_SERVERDIR',
        'PES_VERBOSE_CONFIGPATH',
        'PES_VERBOSE_LOADFILE',
        'PES_VERBOSE_SERVERCONF',
        'PES_VERBOSE_PUBLICCONF',
        'PES_VERBOSE_ATOMICCONF'
    ], 'server' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:env-settings' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom( '2.9.0' );
    api.use( 'ecmascript', 'server' );
    api.use( 'underscore', 'server' );
    api.use( 'meteorblackbelt:underscore-deep@0.0.3', 'server' );
    api.use( 'udondan:yml@3.2.2_1', 'server' );
}
