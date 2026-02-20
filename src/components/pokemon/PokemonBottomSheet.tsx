import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { Pokemon } from "../../types/pokemon.types";
import { BlurView } from "expo-blur";
import { borderRadius } from "../../config/theme";
import { PokemonDetails } from "./PokemonDetails";
import { StyleSheet } from "react-native";

export default function PokemonBottomSheet({
  bottomSheetRef,
  pokemon,
}: {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  pokemon: Pokemon | null;
}) {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={["5%", "50%", "75%"]}
      backgroundComponent={() => (
        <BlurView
          intensity={100}
          tint="light"
          style={{
            ...StyleSheet.absoluteFillObject,
            borderTopLeftRadius: borderRadius.lg,
            borderTopRightRadius: borderRadius.lg,
            overflow: "hidden",
          }}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        {pokemon ? <PokemonDetails pokemon={pokemon} /> : null}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },
});
