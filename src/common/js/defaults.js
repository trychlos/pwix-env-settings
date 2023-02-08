/*
 * pwix:env-settings/src/common/js/defaults.js
 */

defaults = {
    conf: {
        verbosity: PES_VERBOSE_NONE
    }
};

pwixEnvSettings.conf = {
    ...pwixEnvSettings.conf,
    ...defaults.conf
};
