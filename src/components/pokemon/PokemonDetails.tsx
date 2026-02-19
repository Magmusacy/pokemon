import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import { Image } from "expo-image";

export function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const { pokemon: favoritePokemon, changeFavoritePokemon } =
    useFavoritePokemon();

  const handleAddingToFavorites = () => {
    if (favoritePokemon?.id === pokemon.id) {
      changeFavoritePokemon(null);
    } else {
      changeFavoritePokemon(pokemon);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        style={styles.pokemonImage}
        source={pokemon.imageUrl}
        onError={() => {
          console.log(`Failed to download image for pokemon: ${pokemon.name}`);
        }}
        contentFit="contain"
      />
      <TouchableOpacity
        style={[
          styles.favoriteButton,
          favoritePokemon?.id === pokemon.id
            ? styles.removeFromFavoriteButtonColor
            : styles.addToFavoriteButtonColor,
        ]}
        onPress={handleAddingToFavorites}
      >
        <Text>
          {favoritePokemon?.id === pokemon.id
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  favoriteButton: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
  },
  addToFavoriteButtonColor: {
    backgroundColor: "#fff",
  },
  removeFromFavoriteButtonColor: {
    backgroundColor: "#EB4C4C",
  },
  pokemonName: { fontSize: 32, fontWeight: "bold", color: "#EB4C4C" },
});
