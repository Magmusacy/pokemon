import { Platform, Text } from "react-native";
import { AndroidMaps } from "../components/maps/AndroidMap";
import IOSMap from "../components/maps/IOSMap";

export default function WorldMapScreen() {
  if (Platform.OS === "ios") {
    return <IOSMap />;
  } else if (Platform.OS === "android") {
    return <AndroidMaps />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
