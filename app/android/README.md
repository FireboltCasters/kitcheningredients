# Android

You will need:

- Java v 15:

```
openjdk version "15" 2020-09-15
OpenJDK Runtime Environment (build 15+36-1562)
OpenJDK 64-Bit Server VM (build 15+36-1562, mixed mode, sharing)
```


## Troubleshooting

### major version 61

```
...
Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.9/userguide/command_line_interface.html#sec:command_line_warnings

FAILURE: Build failed with an exception.

* Where:
Build file '.../app/node_modules/react-native-webview/android/build.gradle'

* What went wrong:
Could not compile build file '/Users/nbaumgartner/Documents/GitHub/RocketMealsApp/app/node_modules/react-native-webview/android/build.gradle'.
> startup failed:
  General error during semantic analysis: Unsupported class file major version 61
```

To solve this check if you are using java 15 (later versions will not work due to gradle)


### Could not determine the dependencies of task ':app:mergeReleaseAssets'.

```
* What went wrong:
  Could not determine the dependencies of task ':app:mergeReleaseAssets'.
> Could not resolve all task dependencies for configuration ':app:releaseRuntimeClasspath'.
> Could not resolve net.minidev:json-smart:[1.3.1,2.3].
Required by:
project :app > project :react-native-code-push > com.nimbusds:nimbus-jose-jwt:5.1
> Failed to list versions for net.minidev:json-smart.
> Unable to load Maven meta-data from https://jcenter.bintray.com/net/minidev/json-smart/maven-metadata.xml.
> Could not get resource 'https://jcenter.bintray.com/net/minidev/json-smart/maven-metadata.xml'.
> Could not GET 'https://jcenter.bintray.com/net/minidev/json-smart/maven-metadata.xml'.
> org.apache.http.client.ClientProtocolException (no error message)
```

Try in your browser the given urls (for example: https://jcenter.bintray.com/net/minidev/json-smart/maven-metadata.xml).
If these sites are also down, the external repository is down.
Add anohter repository to pull packages from in `build.gradle` (https://github.com/flutter/flutter/issues/94400)


### Package /data/app/de.fireboltcasters.kitchenbase-zqgWYZEsB0ogt320sU6qWg==/base.apk code is missing

Delete `.expo-cache` folder in this project, the cache `android/app/build` folder, the `gradle` cache folder on your machine and rebuild again fresh.