/*
 * pwix:env-settings/src/commoon/js/constants.js
 */

EnvSettings.C = {

    // Verbosity levels
    Verbose: {
        NONE:         0,
        CONFIGURE:    0x01 <<  0,
        READY:        0x01 <<  1,
        STARTUP_MARK: 0x01 <<  2,
        STARTUP_DUMP: 0x01 <<  3,
        SERVERDIR:    0x01 <<  4,
        CONFIGPATH:   0x01 <<  5,
        LOADFILE:     0x01 <<  6,
        SERVERCONF:   0x01 <<  7,
        PUBLICCONF:   0x01 <<  8,
        ATOMICCONF:   0x01 <<  9
    },

    // whether to wait for the Meteor startup() to load the configuration private assets
    // this should be done by the application, but the package is initialized before the former
    // starting with 2.0.0, we do not wait for startup, but is easy here to fallback to the historic behavior
    WaitForStartup: false,

    // an internal publication to let the server propagates the 'ready' status to the clients
    readyPub: {
        publication: 'pwix:env-settings.ready.publication',
        collection: 'pwix:env-settings.ready.collection'
    }
};
