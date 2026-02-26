/*
 * pwix:env-settings/src/common/js/configure.js
 */

import _ from 'lodash';

import { Logger } from 'meteor/pwix:logger';
import { ReactiveVar } from 'meteor/reactive-var';

const logger = Logger.get();

let _conf = {};
EnvSettings._conf = new ReactiveVar( _conf );

EnvSettings._defaults = {
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
        // check that keys exist
        let built_conf = {};
        Object.keys( o ).forEach(( it ) => {
            if( Object.keys( EnvSettings._defaults ).includes( it )){
                built_conf[it] = o[it];
            } else {
                logger.warn( 'configure() ignore unmanaged key \''+it+'\'' );
            }
        });
        if( Object.keys( built_conf ).length ){
            _conf = _.merge( EnvSettings._defaults, _conf, built_conf );
            EnvSettings._conf.set( _conf );
            // verbosity management _after_ having set the conf
            logger.verbose({ verbosity: _conf.verbosity, against: EnvSettings.C.Verbose.CONFIGURE }, 'configure() with', built_conf );
        }
    }
    // also acts as a getter
    return EnvSettings._conf.get();
};

_conf = _.merge( {}, EnvSettings._defaults );
EnvSettings._conf.set( _conf );
