/*
 * pwix:env-settings/src/server/js/config.js
 */

import _ from 'lodash';

EnvSettings._conf = {};

EnvSettings._defaults = {
    verbosity: EnvSettings.C.Verbose.NONE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server
 * @locus Anywhere
 * @param {Object} o Options object
 * @returns {Object} Configuration object
 */
EnvSettings.configure = function( o ){
    if( o && _.isObject( o )){
        _.merge( EnvSettings._conf, EnvSettings._defaults, o );
    }
    // verbosity management _after_ having set the conf
    _verbose( EnvSettings.C.Verbose.CONFIGURE, 'configure() with', o, 'building', EnvSettings._conf );
    // also acts as a getter
    return EnvSettings._conf;
};

_.merge( EnvSettings._conf, EnvSettings._defaults );
