/*
 * pwix:env-settings/src/server/js/defaults.js
 */

import _ from 'lodash';

pwixEnvSettings._defaults = {
    verbosity: PES_VERBOSE_NONE
};

_.merge( pwixEnvSettings.conf, pwixEnvSettings._defaults );
