# pwix:env-settings - TODO

## Summary

1. [Todo](#todo)
2. [Done](#done)

---
## Todo

|   Id | Date       | Description and comment(s) |
| ---: | :---       | :---                       |
|    3 |  |  |

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

---
P. Wieser
- Last updated on 2023, Sept. 12th
