/*
 * pwix:env-settings/src/server/js/startup.js
 */

Meteor.startup(() => {
    if( EnvSettings._conf.verbosity & EnvSettings.C.Verbose.STARTUP_MARK ){
        console.log( 'pwix:env-settings startup' );
    }
});

Meteor.startup(() => {
    if( EnvSettings._conf.verbosity & EnvSettings.C.Verbose.STARTUP_DUMP ){
        console.log( 'pwix:env-settings startup', EnvSettings );
    }
});
