/*
 * pwix:env-settings/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

// whitelisting
if( false ){
}

checkNpmVersions({
    'lodash': '^4.17.21',
    'js-yaml': '^4.1.0'
},
    'pwix:env-settings'
);
