import { Platform, Text, View } from "react-native";
import { AppleMaps, GoogleMaps } from "expo-maps";
import IOSMap from "../components/IOSMap";

export default function WorldMapScreen() {
  if (Platform.OS === "ios") {
    return <IOSMap />;
  } else if (Platform.OS === "android") {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
