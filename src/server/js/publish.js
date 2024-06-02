/*
 * pwix:env-settings/src/server/js/publish.js
 */

// the ready() reactive function obviously doesn't automgically propagate to the clients
// in order to have a ready() reactive function on the client-side, the server publishes the status, and the client subscribes to this publication

Meteor.publish( EnvSettings.C._publicationName, function(){
    this.added( EnvSettings.C._collectionName, '_ready', { ready: EnvSettings.ready() });
    this.changed( EnvSettings.C._collectionName, '_ready', { ready: EnvSettings.ready() });
    this.ready();
});
