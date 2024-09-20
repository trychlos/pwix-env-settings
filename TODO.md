# pwix:env-settings - TODO

## Summary

1. [Todo](#todo)
2. [Done](#done)

---
## Todo

|   Id | Date       | Description and comment(s) |
| ---: | :---       | :---                       |
|    9 |  |  |

---
## Done

|   Id | Date       | Description and comment(s) |
| ---: | :---       | :---                       |
|    1 | 2023- 4-30 | Review EnvSettings.C.Verbose. exports as 'window' variable in a Chrome console shows that these appear to be badly exported |
|      | 2023- 5- 1 | - would it be possible that this would be because this is a server-side package ? |
|      |            |   if yes, it leaves to be explained why constants are declared (though undefined) in client-side... |
|      | 2023- 5-12 | package exports are visible in the client because api.export() defined an export to both side |
|      |            | fixed in v 1.3.0 |
|    2 | 2023- 5-12 | a 'ready' status is advertized at startup() time - replace it with a reactive data source when actually ready |
|      | 2023- 5-12 | done in v 1.3.0 |
|    3 | 2024- 5-22 | Have to migrate to Meteor 3.0 |
|      | 2024- 5-22 | done for 1.5.3 |
|    4 | 2024- 5-22 | udondan:yml is obsoleted - See https://github.com/udondan/meteor-yml/ |
|      | 2024- 5-22 | replaced with the NPM dependency on js-yaml 4.1.0 - done for 1.5.3 |
|    5 | 2024- 5-22 | honors APP_ENV |
|      | 2024- 5-22 | defaulting to NODE_ENV if process.env.APP_ENV is not set - done for 1.5.3 |
|    6 | 2024- 5-29 | [Error]: [The content of file config/server/environments.json does not contain valid YAML!] |
|      |            | at parseConfig (packages/pwix:env-settings/src/server/js/env-settings.js:133:15) |
|      | 2024- 5-29 | fixed |
|    7 | 2024- 5-30 | Do not wait for Meteor.startup to load settings: is it possible ? |
|      | 2024- 6 -1 | Possible with the drawback that the configuration cannot be called by the application before the assets have been read |
|      |            | in other words, the only configuration this package accepts takes effect after its main job... |
|      |            | The behavior is controlled by a common constant |
|    8 | 2024- 6- 2 | BUG: ready() is not propagated to the client |
|      | 2024- 6- 2 | Fixed, requiring a new 'Mongo' dependency |

---
P. Wieser
- Last updated on 2024, Sep. 20th
