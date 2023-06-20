/*
 * pwix:env-settings/src/server/js/startup.js
 */

Meteor.startup(() => {
    if( EnvSettings.conf.verbosity & PES_VERBOSE_STARTUP_MARK ){
        console.log( 'pwix:env-settings startup' );
    }
});

Meteor.startup(() => {
    if( EnvSettings.conf.verbosity & PES_VERBOSE_STARTUP_DUMP ){
        console.log( 'pwix:env-settings startup', EnvSettings );
    }
});
