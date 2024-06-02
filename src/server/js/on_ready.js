/*
 * pwix:env-settings/src/server/js/on_ready.js
 */

import { Tracker } from 'meteor/tracker';

Tracker.autorun(() => {
    if( EnvSettings.ready() && EnvSettings._configured.get()){
        if( EnvSettings._conf.onReady && typeof EnvSettings._conf.onReady === 'function' ){
            EnvSettings._conf.onReady();
        }
    }
});
