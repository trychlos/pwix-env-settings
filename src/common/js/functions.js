/*
 * pwix:env-settings/src/common/js/functions.js
 */

/**
 * @locus Server
 * @returns {Object} the per-environment server settings object addressed by targetPath configuration parameter
 */
EnvSettings.environmentServerSettings = function(){
    let settings = null;
    if( Meteor.isServer ){
        const sourcePath = EnvSettings.configure().sourcePath;
        if( sourcePath ){
            settings = Meteor.settings || null;
            const w = sourcePath.split( '.' );
            w.forEach(( it ) => {
                settings = settings[it] || null;
            });
        }
    }
    return settings[Meteor.settings.runtime.env];
};

/**
 * @locus Anywhere
 * @returns {Object} the per-environment settings object addressed by targetPath configuration parameter
 *  A reactive data source.
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
