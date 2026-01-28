// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add path alias support
config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
};

// Set the app folder to src/app
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = config;
