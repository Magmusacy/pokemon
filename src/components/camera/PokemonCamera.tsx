import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Camera,
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
import { borderRadius, colors } from "../../config/theme";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import { FittedText } from "../utils/FittedText";
import { TakenPhoto } from "./TakenPhoto";

export default function PokemonCamera() {
  const { width, height } = useWindowDimensions();
  const { hasPermission, requestPermission } = useCameraPermission();
  const faceDetectionOptions = useRef<FrameFaceDetectionOptions>({
    autoMode: true,
    windowHeight: height,
    windowWidth: width,
    landmarkMode: "all",
  }).current;
  const cameraRef = useRef<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const faceVisible = useSharedValue(false);
  const foreheadX = useSharedValue(0);
  const foreheadY = useSharedValue(0);
  const foreheadWidth = useSharedValue(0);
  const foreheadHeight = useSharedValue(0);
  const foreheadRotation = useSharedValue(0);
  const { pokemon } = useFavoritePokemon();
  const device = useCameraDevice("front");
  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

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

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto();
    setPhotoUri(`file://${photo.path}`);
    setShowPreview(true);
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    faceVisible.value = false;
    setShowPreview(false);
  };

  const handleDetectedFaces = Worklets.createRunOnJS(
    useCallback((faces: Face[]) => {
      if (faces.length > 0) {
        const face = faces[0];
        const { bounds } = face;
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
    }, []),
  );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces, detectFaces],
  );

  const foreheadStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: withTiming(foreheadX.value, { duration: 100 }),
    top: withTiming(foreheadY.value, { duration: 100 }),
    width: withTiming(foreheadWidth.value, { duration: 100 }),
    height: withTiming(foreheadHeight.value, { duration: 100 }),
    transform: [{ rotateZ: `${foreheadRotation.value}deg` }],
    display: faceVisible.value ? "flex" : "none",
  }));

  if (!hasPermission)
    return <FittedText>Camera permission not granted</FittedText>;
  if (device == null)
    return <FittedText>No camera device available</FittedText>;

  if (photoUri && showPreview) {
    return (
      <TakenPhoto
        width={width}
        height={height}
        photoUri={photoUri}
        pokemonImageUri={pokemon!.imageUrl}
        retakePhoto={retakePhoto}
        pokemonImageProps={{
          foreheadRotation: foreheadRotation.value,
          foreheadX: foreheadX.value,
          foreheadY: foreheadY.value,
          foreheadWidth: foreheadWidth.value,
          foreheadHeight: foreheadHeight.value,
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!!device ? (
        <>
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            photo={true}
            ref={cameraRef}
          />
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
          <Pressable style={styles.overlay} onPress={takePhoto}></Pressable>
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
  overlay: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -40 }],
    bottom: "10%",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    width: 80,
    height: 80,
  },
});
