// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Set the app folder to src/app
config.resolver = config.resolver || {};
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = config;
