const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  return config;
};
