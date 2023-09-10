Package.describe({
    name: 'pwix:env-settings',
    version: '1.5.2-rc',
    summary: 'Autoload settings (YAML, JSON) for server and client from private assets based on NODE_ENV.',
    git: 'https://github.com/trychlos/pwix-env-settings',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'EnvSettings'
    ],
        'server'
    );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:env-settings' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom( '2.13.2' );
    api.use( 'ecmascript', 'server' );
    api.use( 'tmeasday:check-npm-versions@1.0.2', 'server' );
    api.use( 'udondan:yml@3.2.2_1', 'server' );
}
