/*
 * pwix:env-settings/src/common/js/config.js
 */

//console.log( 'pwix:env-settings defining globally exported pwixEnvSettings' );

pwixEnvSettings = {
    // client-specific data and functions
    client: {},

    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        // just do the work
        pwixEnvSettings.conf = {
	    ...pwixEnvSettings.conf,
	    ...o
        };
        // verbosity management _after_ having set the conf
        _verbose( PES_VERBOSE_CONFIGURE, 'configure() with', o );
    },

    // server-specific data and functions
    server: {}
};
