import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";
import { colors, fontSize } from "../../config/theme";

export default function PokemonCard({
  pokemon,
  handleClickedPokemon,
}: {
  pokemon: Pokemon;
  handleClickedPokemon: (pokemon: Pokemon) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleClickedPokemon(pokemon)}
    >
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        style={styles.pokemonImage}
        source={pokemon.imageUrl}
        onError={() => {
          console.log(`Failed to download image for pokemon: ${pokemon.name}`);
          // TODO: add some fallback image here
        }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  pokemonImage: {
    height: "80%",
    aspectRatio: 1,
  },
});
