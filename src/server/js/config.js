/*
 * pwix:env-settings/src/server/js/config.js
 */

pwixEnvSettings = {
    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        // just do the work
        pwixEnvSettings.conf = {
	    ...pwixEnvSettings._defaults,
	    ...o
        };
        // verbosity management _after_ having set the conf
        _verbose( PES_VERBOSE_CONFIGURE, 'configure() with', o );
    }
};
