import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { borderRadius } from "../../config/theme";
import { Pokemon } from "../../types/pokemon.types";
import { PokemonDetails } from "./PokemonDetails";

export default function PokemonBottomSheet({
  bottomSheetRef,
  pokemon,
}: {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  pokemon: Pokemon | null;
}) {
  if (!pokemon) {
    return null;
  }

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={["5%", "50%", "75%"]}
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <BlurView
          intensity={100}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.blurView}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <PokemonDetails pokemon={pokemon} />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: "hidden",
  },
});
