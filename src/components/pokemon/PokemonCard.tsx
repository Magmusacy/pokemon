import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";
import { borderRadius, colors, fontSize } from "../../config/theme";
import { useState } from "react";

export default function PokemonCard({
  pokemon,
  handleClickedPokemon,
}: {
  pokemon: Pokemon;
  handleClickedPokemon: (pokemon: Pokemon) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleClickedPokemon(pokemon)}
    >
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        style={styles.pokemonImage}
        source={
          imgError || !pokemon.imageUrl
            ? require("../../../assets/pokeball.png")
            : pokemon.imageUrl
        }
        onError={() => {
          setImgError(true);
        }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  pokemonImage: {
    height: "70%",
    aspectRatio: 1,
    borderRadius: borderRadius.md,
  },
});
