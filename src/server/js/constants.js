/*
 * pwix:env-settings/src/server/js/constants.js
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
    }
};
