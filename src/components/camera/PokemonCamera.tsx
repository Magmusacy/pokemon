import { StyleSheet, Text } from "react-native";
import {
  useCameraDevice,
  useCameraPermission,
  Camera,
} from "react-native-vision-camera";

export default function PokemonCamera() {
  const { hasPermission } = useCameraPermission();
  const device = useCameraDevice("front");

  if (!hasPermission) return <Text>No camera permissions</Text>;
  if (device == null) return <Text>No camera device available</Text>;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
