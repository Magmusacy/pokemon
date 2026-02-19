import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";

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
    backgroundColor: "#FFEDC7",
    marginBottom: 8,
  },
  pokemonName: { fontSize: 20, fontWeight: "bold", color: "#EB4C4C" },
  pokemonImage: {
    height: "80%",
    aspectRatio: 1,
  },
});
