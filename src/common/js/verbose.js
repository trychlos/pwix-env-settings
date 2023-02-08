/*
 * pwix:env-settings/src/common/js/verbose.js
 */

_verbose = function( level ){
    let _args = [ ...arguments ];
    _args.shift();
    if( pwixEnvSettings.conf.verbosity & level ){
        console.log( 'pwix:env-settings', ..._args );
    }
}
