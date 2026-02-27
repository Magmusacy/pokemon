import { NativeModule, requireNativeModule } from "expo";

import { ExpoPreventScreenshotsModuleEvents } from "./ExpoPreventScreenshots.types";

declare class ExpoPreventScreenshotsModule extends NativeModule<ExpoPreventScreenshotsModuleEvents> {}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPreventScreenshotsModule>(
  "ExpoPreventScreenshots",
);
