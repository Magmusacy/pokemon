import { requireNativeView } from "expo";
import * as React from "react";
import { ViewProps } from "react-native";

export interface ExpoPreventScreenshotsViewProps extends ViewProps {
  children?: React.ReactNode;
}

const NativeView: React.ComponentType<ExpoPreventScreenshotsViewProps> =
  requireNativeView("ExpoPreventScreenshots");

export function ExpoPreventScreenshotsView(
  props: ExpoPreventScreenshotsViewProps,
) {
  return <NativeView {...props} />;
}
