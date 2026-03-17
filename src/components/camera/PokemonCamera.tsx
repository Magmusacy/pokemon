import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  FrameFaceDetectionOptions,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import { FittedText } from "../utils/FittedText";

// in the future maybe make it more restrictive about face tilt angles
export default function PokemonCamera() {
  const { width, height } = useWindowDimensions();
  const { hasPermission, requestPermission } = useCameraPermission();
  const faceDetectionOptions = useRef<FrameFaceDetectionOptions>({
    autoMode: true,
    windowHeight: height,
    windowWidth: width,
    landmarkMode: "all",
  }).current;

  const faceX = useSharedValue(0);
  const faceY = useSharedValue(0);
  const faceWidth = useSharedValue(0);
  const faceHeight = useSharedValue(0);
  const faceVisible = useSharedValue(false);
  const foreheadX = useSharedValue(0);
  const foreheadY = useSharedValue(0);
  const foreheadWidth = useSharedValue(0);
  const foreheadHeight = useSharedValue(0);
  const foreheadRotation = useSharedValue(0);
  const { pokemon } = useFavoritePokemon();

  const device = useCameraDevice("front");
  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  if (!hasPermission)
    return <FittedText>Camera permission not granted</FittedText>;
  if (device == null)
    return <FittedText>No camera device available</FittedText>;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    return () => {
      // you must call `stopListeners` when current component is unmounted
      stopListeners();
    };
  }, []);

  useEffect(() => {
    if (!device) {
      // you must call `stopListeners` when `Camera` component is unmounted
      stopListeners();
      return;
    }
  }, [device]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length > 0) {
      const face = faces[0];
      // console.log(face.bounds);
      const { bounds } = face;
      console.log("rollAngle:", face.rollAngle);
      console.log("bounds:", JSON.stringify(bounds));
      faceX.value = bounds.x;
      faceY.value = bounds.y;
      faceWidth.value = Math.max(bounds.width, bounds.height);
      faceHeight.value = Math.max(bounds.width, bounds.height);
      faceVisible.value = true;

      // Face center
      const cx = bounds.x + bounds.width / 2;
      const cy = bounds.y + bounds.height / 2;

      // Distance from face center up to forehead
      const faceSize = Math.max(bounds.width, bounds.height);
      const d = faceSize * 0.35;

      // Rotate forehead offset by rollAngle around face center
      const angleRad = (face.rollAngle * Math.PI) / 180;
      // Forehead dimenions
      const fhW = faceSize * 0.5;
      const fhH = faceSize * 0.25;

      // Straight up offset (0, -d) rotated by rollAngle:
      // newOffsetX = d * sin(angle), newOffsetY = -d * cos(angle)
      const fhCenterX = cx + d * Math.sin(angleRad);
      const fhCenterY = cy - d * Math.cos(angleRad);

      foreheadX.value = fhCenterX - fhW / 2;
      foreheadY.value = fhCenterY - fhH / 2;
      foreheadWidth.value = fhW;
      foreheadHeight.value = fhH;
      foreheadRotation.value = withTiming(face.rollAngle, { duration: 100 });
    } else {
      faceVisible.value = false;
    }
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        handleDetectedFaces(faces);
      });
    },
    [handleDetectedFaces],
  );

  // debug purposes
  // const faceBoxStyle = useAnimatedStyle(() => ({
  //   position: "absolute",
  //   left: withTiming(faceX.value, { duration: 100 }),
  //   top: withTiming(faceY.value, { duration: 100 }),
  //   width: withTiming(faceWidth.value, { duration: 100 }),
  //   height: withTiming(faceHeight.value, { duration: 100 }),

  //   borderWidth: 2,
  //   borderColor: "cyan",
  //   opacity: faceVisible.value ? 1 : 0,
  // }));

  const foreheadStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: withTiming(foreheadX.value, { duration: 100 }),
    top: withTiming(foreheadY.value, { duration: 100 }),
    width: withTiming(foreheadWidth.value, { duration: 100 }),
    height: withTiming(foreheadHeight.value, { duration: 100 }),
    transform: [{ rotateZ: `${foreheadRotation.value}deg` }],
    display: faceVisible.value ? "flex" : "none",
  }));

  return (
    <View style={{ flex: 1 }}>
      {!!device ? (
        <>
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />
          {/* <Animated.View style={faceBoxStyle} /> debug purposes */}
          <Animated.View style={foreheadStyle}>
            <Image
              style={styles.pokemonImage}
              source={pokemon!.imageUrl}
              onError={() => {
                console.log(
                  `Failed to download image for pokemon: ${pokemon!.name}`,
                );
              }}
              contentFit="contain"
            />
          </Animated.View>
        </>
      ) : (
        <Text>No Device</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonImage: {
    width: "100%",
    height: "100%",
  },
});
