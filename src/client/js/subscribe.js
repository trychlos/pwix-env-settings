/*
 * pwix:env-settings/src/client/js/subscribe.js
 */

import { Mongo } from 'meteor/mongo';

const _handle = Meteor.subscribe( EnvSettings.C.readyPub.publication );

Tracker.autorun(() => {
    if( _handle.ready()){
        const _collectionDB = new Mongo.Collection( EnvSettings.C.readyPub.collection );
        const ready = _collectionDB.find().fetch()[0].ready;
        EnvSettings.ready( Boolean( ready > 0 ));
    }
});
