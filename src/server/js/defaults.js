/*
 * pwix:env-settings/src/server/js/defaults.js
 */

import _ from 'lodash';

EnvSettings._defaults = {
    verbosity: PES_VERBOSE_NONE
};

_.merge( EnvSettings.conf, EnvSettings._defaults );
