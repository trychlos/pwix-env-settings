/*
 * pwix:env-settings/src/server/js/verbose.js
 */

_verbose = function( level ){
    if( EnvSettings.configure().verbosity & level ){
        let _args = [ ...arguments ];
        _args.shift();
        console.log( 'pwix:env-settings', ..._args );
    }
}
