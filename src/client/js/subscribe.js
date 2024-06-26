/*
 * pwix:env-settings/src/client/js/subscribe.js
 */

import { Mongo } from 'meteor/mongo';

_handle = Meteor.subscribe( EnvSettings.C._publicationName );
_collectionDB = new Mongo.Collection( EnvSettings.C._collectionName );

Tracker.autorun(() => {
    if( _handle.ready()){
        const ready = _collectionDB.find().fetch()[0].ready;
        EnvSettings.ready( ready );
    }
});
