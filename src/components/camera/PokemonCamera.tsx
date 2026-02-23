import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function PokemonCamera() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <Text>No camera permissions</Text>;
  if (device == null) return <Text>No camera device available</Text>;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
