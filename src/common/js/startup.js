/*
 * pwix:env-settings/src/server/js/startup.js
 */

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

Meteor.startup(() => {
    logger.verbose({ verbosity: EnvSettings.configure().verbosity, against: EnvSettings.C.Verbose.STARTUP_MARK }, 'startup' );
    logger.verbose({ verbosity: EnvSettings.configure().verbosity, against: EnvSettings.C.Verbose.STARTUP_DUMP }, 'startup', EnvSettings );
});
