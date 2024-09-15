# pwix:env-settings

## Preliminary notes

This package is a fork from [4commerce:env-settings v 1.2.0](https://github.com/4commerce-technologies-AG/meteor-package-env-settings/):
- because this original package does exactly what it says, and does it well
- unfortunately, it seems no more maintained
- fortunatly, I was been able to fix the issue I encountered
- so this package ;)

## What is it ?

This [meteorjs](https://www.meteor.com) package allows you to organize your settings inside your `private/config` assets directory as a bunch of YAML and/or JSON files, that this package explores, loads and merges into the server-side `Meteor.settings`. Thanks to Meteor magics, all `Meteor.settings.public` data is also made available to the client side.

This was a initial deal.

Starting with v2.1.0, the package is able to honor a server path to be made available to the client side, so that an application is able to get its settings from these same files. When the path is correctly configured, you are even able to get some per-environment settings.

To let to the server keep some confidentialy, keys which are named `private`, and their children, are always filtered and never sent to the client.

### Environment management

While `nodejs` defines only three environments (`development`, `staging` and `production`), and though Meteor has followed the same route, we strongly believe that more would be better, and that we should not be tied to such only three parts.

We so use the `APP_ENV` environment variable to address our own environment identifier. The settings default to be read from the server settings for this environment through the path `environments[process.env.APP_ENV]`.

If not specified in the `APP_ENV` variable, the environment identifier falls back to the `nodejs` `NODE_ENV` environment name.

## Installation

This Meteor package is installable with the usual command:

```sh
    meteor add pwix:env-settings
```

## Usage

As simple as:

```js
    import { EnvSettings } from 'meteor/pwix:env-settings';
```

### When configuration assets are they loaded ?

Historically, configuration assets were loaded at `Meteor.startup()` time.

Starting with v 2.0.0, configuration assets are loaded at package initialization time, i.e. very early in the startup process.

Starting with v 2.1.0, configuration assets are re-loaded at package configuration time, and `Meteor.settings.public` is rebuilt.

This behavior is hard-coded, and controlled through the `EnvSettings.C.WaitForStartup` constant.

## Provides

### Client side

On client side, the package sets the `Meteor.settings.public` object to the public configuration read from (server-side) `private/config/public` folder, and adds a `runtime: { env: <env> }` to it, giving something like:

```js
    {
        public: {                                                             <- the `public` leaf of the server tree
            comments: [                                                       ^
                'General env-settings package configuration',                 |
                'see https://atmospherejs.com/pwix/env-settings'              |
            ],                                                                | the merged content of all yaml/json files found under `private/config/public` folder.
            persistent_session: { default_method: 'persistent' },             |
            myConfig: {                                                       |
                a_key: [Object],                                              |
                version: '23.05.17.4'                                         |
            },                                                                v
            runtime: { env: 'dev:0' }                                         <- dynamically added by the package
        }
    }
```

### Server side

On server side, the package sets the same `Meteor.settings.public` object than on the client side, and adds to ``Meteor.settings`` the full merged content of the `private/config/server` folder, giving something like:

```js
    {
        public: {
            comments: [
                'General env-settings package configuration',
                'see https://atmospherejs.com/pwix/env-settings'
            ],
            persistent_session: { default_method: 'persistent' },
            myConfig: {
                a_key: [Object],
                version: '23.05.17.4'
            },
            runtime: { env: 'dev:0' }
        },
        myServerConfig: {
            ...
        },
        runtime: {
            env: 'dev:0',
            serverDir: '/home/pierre/data/eclipse/iziam/.meteor/local/build/programs/server'
        }
    }
```

### `EnvSettings`

The exported `EnvSettings` global object provides following items:

#### Functions

##### `EnvSettings.configure()`

    The configuration method. See [below](#configuration).

##### `EnvSettings.environmentSettings()`

    Returns the defined per-environment settings object.

    This is the object addressed by `targetPath` configuration parameter.

##### `EnvSettings.ready()`

    A reactive getter/setter method which get/set the readyness status of the package.

    The package is considered ready when all configuration files have been loaded.

    Available both on the client and the server (though less useful in this later).

## Configuration

The package's behavior can be configured through a call to the `EnvSettings.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `reconfigurePackages`

    Per-environment settings (aka `Meteor.settings.public.environment`) let some packages be reconfigured by providing an object:

```json
    "packages": {
        "pwix:accounts-ui": {                   the name of the package
            "global": "AccountsUI",             the name of the exported global which holds the configure() function
            "conf": {                           the list of overriden keys for this environment
                "passwordLength": 4,            as either a value or a constant
                "passwordStrength": {
                    "constant": "AccountsUI.C.Password.VERYWEAK"
                }
            }
        }
    }
```

    Defaults to `true`.

- `sourcePath`

    The server path where the environment identifier is to be searched. The found environment data will be made available to the client, as an `<targetPath>` object.

    Defaults to `environments`.

- `targetPath`

    The target `Meteor.settings.public` path, defaulting to `environment`.

- `verbosity`

    A OR-ed value which describes the verbosity level requested by the application.

    Accepted values are:

    - `EnvSettings.C.Verbose.NONE`

        No verbose at all.

    - `EnvSettings.C.Verbose.CONFIGURE`

        Trace calls to `EnvSettings.configure()` and their result.

    - `EnvSettings.C.Verbose.READY`

        Emit a message when the package is ready.

    - `EnvSettings.C.Verbose.STARTUP_MARK`

        Emit a message when the package runs Meteor.startup().

    - `EnvSettings.C.Verbose.STARTUP_DUMP`

        Dump `EnvSettings` object at Meteor.startup().

    - `EnvSettings.C.Verbose.SERVERDIR`

        Trace the server directory where settings are read from.

    - `EnvSettings.C.Verbose.CONFIGPATH`

        Trace the private configuration directory.

    - `EnvSettings.C.Verbose.LOADFILE`

        Trace each individual filename at the time it is loaded.

    - `EnvSettings.C.Verbose.SERVERCONF`

        Trace the loading of `config/server` settings.

    - `EnvSettings.C.Verbose.PUBLICCONF`

        Trace the loading of `config/public` settings.

    - `EnvSettings.C.Verbose.ATOMICCONF`

        Trace the content of each individual file at the time it is loaded.

    - `EnvSettings.C.Verbose.RECONFIGURE`

        Trace the content of package reconfigurations on a per-environment basis.

When called without argument, `EnvSettings.configure()` acts as a reactive data getter.

Also note, as an explicit reminder, that, because the Meteor packages are instanciated at application level, they can have only one configuration. In order to prevent any risk of collision, the configuration of the package should be reserved to the application itself. In other words, other packages, even if they take advantage of this one, should not try to call themselves the `EnvSettings.configure()` method.

You have been warned: **only the application should configure the package**.

## NPM peer dependencies

As of v 1.5.0, `underscore` and `meteorblackbelt:underscore-deep` dependencies are replaced with `lodash`.

Starting with v 1.4.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 2.0.0:
```
    'lodash': '^4.17.21',
    'js-yaml': '^4.1.0'
```

Each of these dependencies should be installed at application level:
```
    meteor npm install <package> --save
```

## Translations

None at the moment.

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-env-settings/issues).

## Original documentation

The rest of this documentation is originally from **4commerce**. See also [the Github original repository](https://github.com/4commerce-technologies-AG/meteor-package-env-settings/).

It may have been fixed for some typos, and have removed some obsolete sentences.

----

### Directory structure

All configuration files must be placed in

````
private/config
````

There is the option to create sub-directories for all environments to load a set of configuration files for server and public

*Defaults*

````
private/config/public/
private/config/server/
````

*Per environment*

````
private/config/development/public/
private/config/development/server/

private/config/production/public/
private/config/production/server/
````

> You may name your environments as you like but I advise you to stay with the standards like development, production and testing.

*Single file configurations*

If you do not want to create partials for your configuration files, you also may use (also mixable) the single file naming:

````
private/config/public.yaml
private/config/server.yaml

private/config/production/public.yaml
private/config/production/server.yaml
````

*File extensions*

The loader will only take care of following files, all others are skipped:

````
*.json
*.yaml
*.yml
````

*Loading order*

Below you see the complete pattern matching and also the loading order. Config files are loaded and merged from inner to outer sub-directories. Beware of this when deciding your overloads.

````
private/config/public.(json|yaml|yml)
private/config/public/*.(json|yaml|yml)
private/config/environment/public.(json|yaml|yml)
private/config/environment/public/*.(json|yaml|yml)

private/config/server.(json|yaml|yml)
private/config/server/*.(json|yaml|yml)
private/config/environment/server.(json|yaml|yml)
private/config/environment/server/*.(json|yaml|yml)
````

> Also the file extensions will touch the ordering and you will overload file.json with file.yaml with file.yml. But, I would advise you to use just one type for each file.

### Meteor.settings

The configuration files are loaded during `Meteor.startup()` which is included in the package.

If you place this package somewhere on top of your used packages, you be able to access your settings on a early stage.

After autoload of your configuration files you may access the settings through the standard `Meteor.settings` and `Meteor.settings.public` object. Your `Meteor.settings.public` values are also available on your client app.

Try `console.log(Meteor.settings);` on both client and server and get what has distributed.

[Read more at meteor documentation](http://docs.meteor.com/#/full/meteor_settings)

### Meteor.settings.(public).runtime

In addition we append a few useful properties about the runtime environment automatically during the loading process.

*Server only:*

````
console.log(Meteor.settings.runtime.env); => "development"
````

````
console.log(Meteor.settings.runtime.serverDir); => absolute file path to your meteor server bundle path
````

*Public both:*

````
console.log(Meteor.settings.public.runtime.env); => "development"
````

### Grammar

Your config files may notated in [JSON](https://en.wikipedia.org/wiki/JSON) and [YAML](https://en.wikipedia.org/wiki/YAML) grammar (see links to Wikipedia).

*Example public.yaml:*

````
application:
  name: "My super application"
  version: "1.0"

images:
  upload: "upload-folder"
  max_size: 10
  auto_shrink: true
````

*Example public.json:*

````
{
  "application": {
    "name": "My super application",
    "version": "1.0"
  },

  "images": {
    "upload": "upload-folder",
    "max_size": 10,
    "auto_shrink": true
  }
}
````

I prefer to use [YAML](https://en.wikipedia.org/wiki/YAML) in case of it's easy notation and leveling.

For parsing YAML and JSON we are using [js-yaml](https://github.com/nodeca/js-yaml) and getting file content via it's `safeLoad` method. Please be aware that this is defined as loading untrusted data and therefore some features are not enabled. Currently I can't see any loss on that.

You may check your YAML code on their online editor at: http://nodeca.github.io/js-yaml/

### Loading, overloading and merge

After each config file is loaded, parsed and instatiated, we extend that object to the already existing configuration. For that process we are using `_.deepExtend` which do not replace sub-elements but merge or overload them.

For overloading you have to take care about the file loading order which is described at section [Directory Structure](#directory-structure).

Here is a small example.

*config/public.yaml*

````
caches:
  enabled: false
  tmp_path: /tmp
````

*config/production/public.yaml*

````
caches:
  enabled: true
````

*config/testing/public.yaml*

````
caches:
  tmp_path: /dev/null
````


This will result in always `Meteor.settings.public.caches.enabled == false` except when your environment is `production`.

The value of `Meteor.settings.public.caches.tmp_path` gets overwritten on the `testing` environment only

### Partials

If you want to structure your configuration in partials you can use folders to place them to right configuration context.

*config/public/caches.yaml*

````
caches:
  enabled: false
  tmp_path: /tmp
````

*config/public/mail.yaml*

````
smtp:
  server: mail.local
````

*config/production/public/caches.yaml*

````
caches:
  enabled: true
````

*config/testing/public/mail.yaml*

````
smtp:
  server: mail.trash
````

Be aware that the rules of overloading and file ordering is still the same.

_Attention_: It is not necessary for the loader that the partials have the same filename at all environments – but, I advise you to name them equal for clearness.

### Meteor option --settings and METEOR_SETTINGS

In case that we merge and overload the content of your config files to the `Meteor.settings` object, you still can initialize it with the standard options.

### Set mission critical / security values

As said in previous paragraph, you still can load some values to your settings via the `METEOR_SETTINGS` env var. So within that you can place your login credentials like Amazon S3 keys etc. without committing them to your repos. All other app settings getting merged by this package.

### Template.helpers

From release 1.2.0 we dropped the dependencies to our helper packages. If you want to get easy access to your public settings while working on your templates, we advise you to install one or both of our template helpers for that.

##### meteor-namespace-template-helper

See package [4commerce:meteor-namespace-template-helper](https://atmospherejs.com/4commerce/meteor-namespace-template-helper). This package brings the Meteor namespace (Meteor.user, Meteor.settings.public etc.) directly to templates.

*Example:*

````
<template name="about">
  <span>{{Meteor.settings.public.application.version}}</span>
</template>
````

Read more at the package's homepage [on GitHub](https://github.com/4commerce-technologies-AG/meteor-package-meteor-namespace-template-helper).

##### pubsettings-template-helper

See package [4commerce:pubsettings-template-helper](https://atmospherejs.com/4commerce/pubsettings-template-helper). This package gain access to `Meteor.settings.public` within your templates by a _ShortCut function_.

*Example:*

````
<template name="about">
  <span>{{pubSettings.application.version}}</span>
</template>
````

Read more at the package's homepage [on GitHub](https://github.com/4commerce-technologies-AG/meteor-package-pubsettings-template-helper).

### Changes to Meteor.settings

The object properties of Meteor.settings are always writeable. We highly advise you not to make changes to your settings inside your server or your client app. If you have to and can not realize your requests within the configuration files, you should make latest changes while inside main startup code. The setting values are not reactive and changes are not (re-)synced between client and server.

### A public element in your config files

The loading process will automatically merge the public settings at the `Meteor.settings.public` element. Therefore and to make sure that you have not made a typing error, we denied the occurence of a `public` element at root level inside your public and server configurations (only at root level). This should avoid (miss-typed) structures like `Meteor.settings.public.public`. In such a case an error is thrown with the identification of the false file.

### Related packages

When you add this package, following may be useful to add:

1. [4commerce:meteor-namespace-template-helper](https://atmospherejs.com/4commerce/meteor-namespace-template-helper)
2. [4commerce:pubsettings-template-helper](https://atmospherejs.com/4commerce/pubsettings-template-helper)

### Author & Credits

Author: [Tom Freudenberg, 4commerce technologies AG](http://about.me/tom.freudenberg)

Copyright (c) 2015 [Tom Freudenberg](http://www.4commerce.de/), [4commerce technologies AG](http://www.4commerce.de/), released under the MIT license

---
P. Wieser
- Last updated on 2024, Jun. 13th
