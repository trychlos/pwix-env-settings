/*
 * pwix:env-settings/src/common/js/functions.js
 */

/**
 * @locus Anywhere
 * @returns {Object} the per-environment settings object addressed by targetPath configuration parameter
 */
EnvSettings.environmentSettings = function(){
    const targetPath = EnvSettings.configure().targetPath;
    let settings = null;
    if( targetPath ){
        settings = Meteor.settings.public || null;
        const w = targetPath.split( '.' );
        w.forEach(( it ) => {
            settings = settings[it] || null;
        });
    }
    return settings;
};
