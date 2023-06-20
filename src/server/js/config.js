/*
 * pwix:env-settings/src/server/js/config.js
 */

import _ from 'lodash';

EnvSettings = {
    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        _.merge( EnvSettings.conf, EnvSettings._defaults, o );
	    // verbosity management _after_ having set the conf
        _verbose( PES_VERBOSE_CONFIGURE, 'configure() with', o, 'building', EnvSettings.conf );
    }
};
