// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Expo's web modules (expo-font, expo-asset, etc.) register themselves via
// `registerWebModule`, which reads `moduleImplementation.name` at runtime.
// The default production minifier strips/mangles class names, which makes
// that lookup fail with "Module implementation must be a class". Keeping
// class and function names intact fixes this for web production builds.
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

module.exports = config;
