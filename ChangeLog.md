# pwix:env-settings

## ChangeLog

### 2.0.1-rc

    Release date: 

    - Fix the ready() propagation to the clients (todo #8), adding a new dependency on Mongo

### 2.0.0

    Release date: 2024- 6- 2

    - The package is extended to the client side to let public settings land to the client (thus bumping the candidate release number)
    - No more wait for Meteor.startup() to load private configuration assets (todo #7)
      the verbosity configuration becomes obsolete, this can be controlled through the hardcoded EnvSettings.C.WaitForStartup constant
    - Introduce onReady() configuration function

### 1.6.1

    Release date: 2024- 5-29

    - Fix #6: only trying to interpret as YML

### 1.6.0

    Release date: 2024- 5-23

    - Meteor 3.0 ready (todo #3)
    - obsolete undondan:yml package dependency, replaced with a dependency on NPM js-yaml (todo #4)
    - honors APP_ENV environment variable, defaulting to NODE_ENV (todo #5) - bumping the candidate release number

### 1.5.2

    Release date: 2023- 9-12

    - Back to Meteor 2.9.0

### 1.5.1

    Release date: 2023- 9-10

    - Fix global object definition

### 1.5.0

    Release date: 2023- 9-10

    - Merge defaults.js into config.js
    - Rename conf to _conf, making clearer it is private
    - configure() now acts both as a getter and a setter
    - Replace exported PES_VERSBOSE_ constants and include them in exported EnvSettings global (bumping release candidate version)
    - Bump required Meteor to 2.13.2

### 1.4.0

    Release date: 2023- 6-20

    - Add a dependency on tmeasday:check-npm-versions
    - Replace underscore and meteorblackbelt:underscore-deep dependencies with lodash

### 1.3.1

    Release date: 2023- 5-12

    - Fix ChangeLog release date

### 1.3.0

    Release date: 2023- 5-12

    - Define a EnvSettings.ready() reactive data source
    - Emphasize this is a server-side only package
        - by exporting only to the server
        - cleaning the files layout to have a server only structure

    - Do not try to export undefined EnvSettings.C.Verbose.DEFINE

### 1.2.2

    Release date: 2023- 5- 1

    - Review files layout
    - Define EnvSettings.configure() and verbosity levels

### 1.2.1

    Release date: 2023- 1-29

    - Initial release as a (fixed) fork of 4commerce:env-settings v 1.2.0

---
P. Wieser
- Last updated on 2024, Jun. 2nd
