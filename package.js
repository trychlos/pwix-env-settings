Package.describe({
    name: 'pwix:env-settings',
    version: '1.2.2-rc',
    summary: 'Autoload settings (YAML, JSON) for server and client from private assets based on NODE_ENV.',
    git: 'https://github.com/trychlos/pwix-env-settings',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use('underscore');
    api.use('meteorblackbelt:underscore-deep@0.0.3');
    api.use('udondan:yml@3.2.2_1', 'server');
    api.addFiles('env-settings.js','server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('pwix:env-settings');
});
