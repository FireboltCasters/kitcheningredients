## Troubleshooting

### Navigating always to the same route

This may result due that the `name` of your component gets minified during building (occurs for production).
To solve this you need to preserve the FunctionCompontent names. If you are using `metro.config.js` you can use the following:

```
module.exports = {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    minifierConfig: { //To allow routing we need the name of FunctionComponents, therefore we disable minification
      //https://stackoverflow.com/questions/70562376/sentry-not-working-properly-in-react-native-release-apk
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
      mangle: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
      },
    },
  },
};
```
