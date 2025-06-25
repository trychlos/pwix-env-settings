/*
 * pwix:env-settings/src/common/js/ready.js
 *
 * The package reads application settings as soon as possible, and so before it has any chance to be configured.
 * It so set this readyness true a first time.
 * When (and if) the package is configured, settings are re-read, and readyness is re-set.
 * So we implement a counter rather than a boolean to be sure an autorun can detect multiple updates
 * (because the data itself must go to Meteor.settings which transits from server to client, and thus cannot be a ReactiveVar).
 */

import _ from 'lodash';

import { Tracker } from 'meteor/tracker';

_ready = {
    value: 0,
    dep: new Tracker.Dependency()
};

/**
 * @locus Anywhere
 * @summary Set/Get the readyness status of the package
 *  the package is considered as 'ready' when it has finished to read and load all the settings files
 * @param {Boolean|none} b a status to be set when acting as a setter
 * @returns {Boolean} the current readyness status
 *  A reactive data source.
 */
EnvSettings.ready = function( b ){
    if( b === true ){
        _ready.value += 1;
        _ready.dep.changed();
    }
    _ready.dep.depend();
    return _ready.value;
}

Tracker.autorun(() => {
    EnvSettings.verbose( EnvSettings.C.Verbose.READY, 'ready', EnvSettings.ready() ? 'true':'false' );
});
