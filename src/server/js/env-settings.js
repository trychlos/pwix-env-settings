/*
 *	This is env-settings from 4commerce:env-settings Meteor package
 *	See https://atmospherejs.com/4commerce/env-settings
 *	See https://github.com/4commerce-technologies-AG/meteor-package-env-settings/
 *
 *	As of 2022- 1-10, last Github update for this project is Jul 12, 2015.
 *	One may safely believe that this project is very stable ;)
 *
 *	Unfortunatly, this package does not install correctly in Meteor with the exception:
 *
 *	Error: Cannot find module '/home/pierre/data/eclipse/copter/.meteor/local/build/programs/server/node_modules/mini-files'
 *  W20220110-14:20:48.100(1)? (STDERR) Require stack:
 *  W20220110-14:20:48.100(1)? (STDERR) - /home/pierre/data/eclipse/copter/.meteor/local/build/programs/server/boot.js
 *  W20220110-14:20:48.100(1)? (STDERR) - /home/pierre/data/eclipse/copter/.meteor/local/build/main.js
 *  W20220110-14:20:48.100(1)? (STDERR)     at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
 *  W20220110-14:20:48.100(1)? (STDERR)     at Function.Module._load (internal/modules/cjs/loader.js:746:27)
 *  W20220110-14:20:48.100(1)? (STDERR)     at Module.require (internal/modules/cjs/loader.js:974:19)
 *  W20220110-14:20:48.100(1)? (STDERR)     at require (internal/modules/cjs/helpers.js:93:18)
 *  W20220110-14:20:48.101(1)? (STDERR)     at Object.require (/home/pierre/data/eclipse/copter/.meteor/local/build/programs/server/boot.js:282:22)
 *  W20220110-14:20:48.101(1)? (STDERR)     at packages/4commerce_env-settings.js:30:17
 *  W20220110-14:20:48.101(1)? (STDERR)     at packages/4commerce_env-settings.js:185:4
 *  W20220110-14:20:48.101(1)? (STDERR)     at packages/4commerce_env-settings.js:189:4
 *  W20220110-14:20:48.101(1)? (STDERR)     at packages/4commerce_env-settings.js:195:3
 *
 * Please note that a PR already exists in Github
 * https://github.com/4commerce-technologies-AG/meteor-package-env-settings/pull/7
 * though with an obsolete relative path :(
 *
 *  pwi 2023- 6-20 use lodash instead of meteorblackbelt:underscore-deep/deepExtend
 *
 *  pwi 2022- 1-10 fix mini-files.js require
 *                 bump the version from 1.2.0 to 1.2.1
 */

import _ from 'lodash';
import YAML from 'js-yaml';

import { Tracker } from 'meteor/tracker';

// use for file access
var fs = Npm.require( 'fs' );
// using this meteor lib, gives secure access to folder structure
var files = Npm.require( '../mini-files' );

// save reference to serverDir
var serverDir = files.pathResolve( __meteor_bootstrap__.serverDir );
_verbose( EnvSettings.C.Verbose.SERVERDIR, 'serverDir', serverDir );

// Taken from meteor/tools/bundler.js#L1509
// currently the directory structure has not changed for build
var assetBundlePath = files.pathJoin( serverDir, 'assets', 'app' );

// location of the private config folders
var configPath = files.pathJoin( assetBundlePath, 'config' );
_verbose( EnvSettings.C.Verbose.CONFIGPATH, 'configPath', configPath );

// when showing error messages, we want to show the shortest path
// to the private asset ressource and not the absolute path from bundle
function assetPath(path) {
    return path.replace( assetBundlePath, '' ).substring( 1 );
}

// this function autoloads settings from private/config assets folder
// located at private/config (see function getConfig)
function autoloadSettings(){
	//console.debug( 'pwix:env-settings.autoloadSettings()' );

    // extend the global settings
    _verbose( EnvSettings.C.Verbose.SERVERCONF, 'extending with serverConfig' );
    _verbose( EnvSettings.C.Verbose.SERVERCONF, 'Meteor.settings', Meteor.settings );

    const serverConfig = getConfig( configPath, 'server' );
    Meteor.settings = Meteor.settings || {};
    _.merge( Meteor.settings, serverConfig );

    _verbose( EnvSettings.C.Verbose.SERVERCONF, 'serverConfig', serverConfig );
    _verbose( EnvSettings.C.Verbose.SERVERCONF, 'Meteor.settings', Meteor.settings );

    // extend Meteor.settings.public
    _verbose( EnvSettings.C.Verbose.PUBLICCONF, 'extending with publicConfig' );
    _verbose( EnvSettings.C.Verbose.PUBLICCONF, 'Meteor.settings.public', Meteor.settings.public );

    const publicConfig = getConfig( configPath, 'public' );
    Meteor.settings.public = Meteor.settings.public || {};
    _.merge( Meteor.settings.public, publicConfig );

    _verbose( EnvSettings.C.Verbose.PUBLICCONF, 'publicConfig', publicConfig );
    _verbose( EnvSettings.C.Verbose.PUBLICCONF, 'Meteor.settings.public', Meteor.settings.public );

    // check if we need to append the new public settings also
    // to the runtime_environment. this happens, when no settings
    // before via --settings or METEOR_SETTINGS was set.
    // taken from packages/meteor/server_environments.js
    // Push a subset of settings to the client.
    // ----
    // if PR on github is accepted
    // https://github.com/meteor/meteor/pull/4704
    // then this won't be necessary anymore
    if( typeof __meteor_runtime_config__ === 'object' ){
        __meteor_runtime_config__.PUBLIC_SETTINGS = Meteor.settings.public;
    }
}

// read complete set of config files and return a new settings object
// directory structure will be read by
// config/(server|public).(json|yaml|yml)
// config/(server|public)/*.(json|yaml|yml) ! not recursive sub-directories
// config/$NODE_ENV/(server|public).(json|yaml|yml)
// config/$NODE_ENV/(server|public)/*.(json|yaml|yml) ! not recursive sub-directories
function getConfig( configPath, scope ){
    var config = {}
    var match_file_ = new RegExp("/" + scope + "\.(json|yml|yaml)$");
    var match_files_ = new RegExp("[^/]+\.(json|yml|yaml)$");

    loadConfigFiles( locateFiles( configPath, false, match_file_ ) , config );
    loadConfigFiles( locateFiles( files.pathJoin( configPath, scope), false, match_files_ ), config );
    loadConfigFiles( locateFiles( files.pathJoin( configPath, process.env.APP_ENV || process.env.NODE_ENV ) , false, match_file_ ), config );
    loadConfigFiles( locateFiles( files.pathJoin( configPath, process.env.APP_ENV || process.env.NODE_ENV, scope ), false, match_files_ ), config );

    return config;
}

// this function reads the content from filesystem
function loadConfigFile( filename ){
    // load the server side config
    var errorMsg = 'Could not find config file ' + assetPath( filename ) + ' in your meteor app!';
    try {
        var res = fs.readFileSync( filename );
        if(!res) {
            throw new Meteor.Error( 'The file ' + assetPath( filename ) + ' does not exist!' );
        } else {
            return res;
        }
    } catch( error ){
    }
}

// this function loops through an array of filenames
// and tries to load and instantiate them.
// result is a deep merge for all files 
function loadConfigFiles( filenames, config ){
    config = config || {}
    filenames.every(( filename ) => {
        _verbose( EnvSettings.C.Verbose.LOADFILE, 'loadFile', filename );
        var content = loadConfigFile( filename );
        if( content !== false ){
            // try to parse the content and return instantiated object 
            var config_ = parseConfig( content, filename );
            _verbose( EnvSettings.C.Verbose.ATOMICCONF, 'atom', config_ );
            // check that no public attribute is used at root
            if( config_ && Object.keys( config_ ).includes( 'public' )){
                throw new Meteor.Error( 'It is not allowed to include public settings at server or public config files on <root> level! Error in file ' + assetPath( filename ) + '.' );
            }
            // merge objects
            _.merge( config, config_ );
        }
        return true;
    });
}

// helper function to search for path and regex-match 
// recursive. if nothing is given as arguments, result
// is all files from one path
function locateFiles( path, recursive_, match_, files_ ){
    match_ = match_ || /.+/;
    recursive_ = false || recursive_;
    files_ = files_ || [];
    // check if directory exists otherwise ignore configurations from there
    var isDirectory = false;
    try { isDirectory = fs.statSync(path).isDirectory() } catch(e) {}
    // loop directory entries
    if (isDirectory) {
        var list = fs.readdirSync(path);
        for (var i in list) {
            var entry = files.pathJoin(path, list[i]);
            if (fs.statSync(entry).isDirectory()) {
                if (recursive_) {
                    locateFiles(entry, recursive_, match_, files_);
                }
            } else {
                if (entry && entry.match(match_)) {
                    files_.push(entry);
                }
            }
        }
    }
    return files_;
}

// this function checks and loads the content for yaml and json files
function parseConfig( content, filename ){
    try {
        return YAML.safeLoad( content );
    } catch( e ){
        try {
            return JSON.parse( content );
        } catch( e ){
            throw new Meteor.Error( 'The content of file ' + assetPath( filename ) + ' does not contain any valid YAML nor JSON.' );
        }
    }
}

// the main load and initialization function
// this package autoloads settings from private/config assets folder
// located at private/config (see function getConfig)
function parsePrivate(){

    // load and merges the YML/JSON setting files
    autoloadSettings();

    // setup the APP_ENV runtime
	setupEnv();

    // make the server environment settings available to the client
    settingsToClient();

    // advertize that the package is ready
    EnvSettings.ready( true );
}

// [chatgpt code] filter the private data
function removePrivateKeys( obj ){
    // If the input is not an object or array, return it as it is (base case)
    if( typeof obj !== 'object' || obj === null ){
        return obj;
    }
    // If the input is an array, recursively process each element
    if( Array.isArray( obj )){
        return obj.map( removePrivateKeys );
    }
    // If the input is an object, process each key-value pair
    let newObj = {};
    for( let key in obj ){
        if( obj.hasOwnProperty( key )){
            // Skip the 'private' key, otherwise recursively process the value
            if( key !== 'private' ){
                newObj[key] = removePrivateKeys( obj[key] );
            }
        }
    }
    return newObj;
}

// Meteor automagically transfers the settings.public object to the client
// update it with the environment variables (but not private ones)
function settingsToClient(){
    // copy environment data to public part (filtering private data)
    const sourcePath = EnvSettings.configure().sourcePath;
    const targetPath = EnvSettings.configure().targetPath;
    if( sourcePath && targetPath ){
        const env = Meteor.settings.public.runtime.env;
        let w = sourcePath.split( '.' );
        let sourceSettings = Meteor.settings || null;
        w.forEach(( it ) => {
            sourceSettings = sourceSettings ? sourceSettings[it] : null;
        });
        sourceSettings = sourceSettings ? sourceSettings[env] : null;
        if( sourceSettings ){
            w = targetPath.split( '.' );
            let targetSettings = Meteor.settings.public || {};
            for( let i=0 ; i<w.length-1 ; ++i ){
                const it = w[i];
                targetSettings[it] = targetSettings[it] || {};
                targetSettings = targetSettings[it];
            }
            targetSettings[w[w.length-1]] = removePrivateKeys( sourceSettings );
        }
    }
}

// set-up the APP_ENV runtime environment variable
// extend Meteor.settings and Meteor.settings.public with some useful addtional attributes
function setupEnv(){
    // server-side
    Meteor.settings.runtime = {
        env: process.env.APP_ENV || process.env.NODE_ENV,
        serverDir: serverDir    
    }
    // client-side
    Meteor.settings.public.runtime = {
        env: process.env.APP_ENV || process.env.NODE_ENV
    }
}

//
// MAIN CODE
//

if( EnvSettings.C.WaitForStartup ){
    Meteor.startup(() => {
        parsePrivate();
    });
} else {
    Tracker.autorun(() => {
        parsePrivate();
    });
}