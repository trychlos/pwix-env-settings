/*
 * pwix:env-settings/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
EnvSettings._conf = new ReactiveVar( _conf );

EnvSettings._defaults = {
    reconfigurePackages: true,
    sourcePath: 'environments',
    targetPath: 'environment',
    verbosity: EnvSettings.C.Verbose.CONFIGURE
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
        _conf = _.merge( EnvSettings._defaults, _conf, o );
        EnvSettings._conf.set( _conf );
        // verbosity management _after_ having set the conf
        if( _conf.verbosity & EnvSettings.C.Verbose.CONFIGURE ){
            console.log( 'pwix:env-settings configure() with', o );
        }
    }
    // also acts as a getter
    return EnvSettings._conf.get();
};

_conf = _.merge( {}, EnvSettings._defaults );
EnvSettings._conf.set( _conf );
