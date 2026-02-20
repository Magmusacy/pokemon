export const colors = {
  primary: "#EB4C4C",
  secondary: "#3B4CCA",
  background: "#FFFFFF",
  surface: "#FFEDC7",
  text: {
    primary: "#EB4C4C",
    secondary: "#666666",
    light: "#FFFFFF",
  },
  tab: {
    active: "#EB4C4C",
    inactive: "#999999",
  },
  favorite: {
    remove: "#EB4C4C",
    add: "#FFFFFF",
  },
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
} as const;
