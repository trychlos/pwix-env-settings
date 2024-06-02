Package.describe({
    name: 'pwix:env-settings',
    version: '2.0.0',
    summary: 'Autoload settings (YAML, JSON) from (server-only) private assets based on running environment.',
    git: 'https://github.com/trychlos/pwix-env-settings',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'EnvSettings'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:env-settings' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    api.use( 'ecmascript' );
    api.use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    api.use( 'tracker' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
