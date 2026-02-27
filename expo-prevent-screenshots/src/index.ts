import ExpoPreventScreenshotsModule from "./ExpoPreventScreenshotsModule";

export function addThemeListener(listener: (event: { theme: string }) => void) {
  return ExpoPreventScreenshotsModule.addListener("themeChange", listener);
}

export function getTheme() {
  return ExpoPreventScreenshotsModule.getTheme();
}

export function setTheme(theme: string): void {
  ExpoPreventScreenshotsModule.setTheme(theme);
}
