import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        style={styles.pokemonImage}
        source={pokemon.imageUrl}
        onError={() => {
          console.log(`Failed to download image for pokemon: ${pokemon.name}`);
        }}
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8b8b8b",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: 8,
  },
  pokemonName: { fontSize: 16, fontWeight: "bold" },
  pokemonImage: {
    width: "100%",
    aspectRatio: 1,
  },
});
