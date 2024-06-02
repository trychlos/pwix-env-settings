/*
 * pwix:env-settings/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

EnvSettings._conf = {};

EnvSettings._configured = new ReactiveVar( false );

EnvSettings._defaults = {
    onReady(){},
    verbosity: EnvSettings.C.Verbose.READY
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
    EnvSettings._configured.set( true );
    // also acts as a getter
    return EnvSettings._conf;
};

_.merge( EnvSettings._conf, EnvSettings._defaults );
