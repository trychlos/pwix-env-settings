/*
 * pwix:env-settings/src/common/js/ready.js
 */

import { Tracker } from 'meteor/tracker';

_ready = {
    value: false,
    dep: new Tracker.Dependency()
};

/**
 * @summary Set/Get the readyness status of the package
 *  the package is considered as 'ready' when it has finished to read and load all the settings files
 * @param {Boolean|none} b a status to be set when acting as a setter
 * @returns {Boolean} the current readyness status
 */
EnvSettings.ready = function( b ){
    if( b === true || b === false ){
        if( _ready.value !== b ){
            _ready.value = b;
            _ready.dep.changed();
        }
    }
    _ready.dep.depend();
    return _ready.value;
}

Tracker.autorun(() => {
    _verbose( EnvSettings.C.Verbose.READY, 'ready', EnvSettings.ready());
});
