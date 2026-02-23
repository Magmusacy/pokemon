import { useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Frame,
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera,
} from "react-native-vision-camera";
import { Camera, Face } from "react-native-vision-camera-face-detector";

export default function PokemonCamera() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const cameraRef = useRef<VisionCamera | null>(null);

  const handleFacesDetection = (faces: Face[], frame: Frame) => {
    console.log("Detected faces:", faces);
    console.log("frame", frame.toString());
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <Text>No camera permissions</Text>;
  if (device == null) return <Text>No camera device available</Text>;
  return (
    <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      faceDetectionCallback={handleFacesDetection}
      faceDetectionOptions={{ landmarkMode: "all" }}
    />
  );
}
