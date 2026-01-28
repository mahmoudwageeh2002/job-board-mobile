/**
 * LinkedIn-inspired theme colors
 */

import { Platform } from "react-native";

const linkedInBlue = "#0A66C2";
const linkedInDarkBlue = "#004182";

export const Colors = {
  // LinkedIn brand colors
  primary: linkedInBlue,
  primaryDark: linkedInDarkBlue,
  secondary: "#378FE9",

  // Background colors
  background: "#FFFFFF",
  backgroundLight: "#F3F6F8",
  backgroundDark: "#1D2226",

  // Text colors
  text: "#000000",
  textSecondary: "#666666",
  textLight: "#8C8C8C",
  textWhite: "#FFFFFF",

  // UI elements
  border: "#E0E0E0",
  card: "#FFFFFF",
  cardDark: "#2D2D2D",

  // Status colors
  success: "#057642",
  error: "#CC1016",
  warning: "#F5BA31",
  info: "#0073B1",

  // Icon colors
  icon: "#666666",
  iconActive: linkedInBlue,

  // Tab colors
  tabIconDefault: "#8C8C8C",
  tabIconSelected: linkedInBlue,
  tabBackground: "#FFFFFF",

  // Button colors
  buttonPrimary: linkedInBlue,
  buttonSecondary: "#FFFFFF",
  buttonBorder: linkedInBlue,

  light: {
    text: "#000000",
    background: "#FFFFFF",
    tint: linkedInBlue,
    icon: "#666666",
    tabIconDefault: "#8C8C8C",
    tabIconSelected: linkedInBlue,
  },
  dark: {
    text: "#FFFFFF",
    background: "#1D2226",
    tint: "#378FE9",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#378FE9",
  },
};

/**
 * Spacing
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Border Radius
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
