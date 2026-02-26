import {
  Canvas,
  Group,
  Image,
  useCanvasRef,
  useImage,
} from "@shopify/react-native-skia";
import { File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PokemonImageProps = {
  foreheadRotation: number;
  foreheadX: number;
  foreheadY: number;
  foreheadWidth: number;
  foreheadHeight: number;
};

export function TakenPhoto({
  width,
  height,
  photoUri,
  pokemonImageUri,
  pokemonImageProps,
  retakePhoto,
}: {
  width: number;
  height: number;
  photoUri: string;
  pokemonImageUri: string;
  pokemonImageProps: PokemonImageProps;
  retakePhoto: () => void;
}) {
  const canvasRef = useCanvasRef();
  const photoImage = useImage(photoUri);
  const pokemonImage = useImage(pokemonImageUri);
  const {
    foreheadRotation,
    foreheadX,
    foreheadY,
    foreheadWidth,
    foreheadHeight,
  } = pokemonImageProps;

  const savePhoto = () => {
    try {
      const image = canvasRef.current?.makeImageSnapshot();
      if (!image) return;
      const bytes = image.encodeToBytes();
      const fileName = `pokemon_photo_${Date.now()}.png`;
      const file = new File(Paths.cache, fileName);
      file.write(bytes);
      MediaLibrary.saveToLibraryAsync(file.uri);
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={canvasRef} style={{ flex: 1 }}>
        <Image image={photoImage} x={0} y={0} width={width} height={height} />

        <Group
          transform={[{ rotateZ: (foreheadRotation * Math.PI) / 180 }]}
          origin={{
            x: foreheadX + foreheadWidth / 2,
            y: foreheadY + foreheadHeight / 2,
          }}
        >
          <Image
            image={pokemonImage}
            x={foreheadX}
            y={foreheadY}
            width={foreheadWidth}
            height={foreheadHeight}
          />
        </Group>
      </Canvas>

      <Pressable onPress={savePhoto} style={styles.saveButton}>
        <Text>Save</Text>
      </Pressable>

      <Pressable onPress={retakePhoto} style={styles.cancelButton}>
        <Text>Retake</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  cancelButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
});
