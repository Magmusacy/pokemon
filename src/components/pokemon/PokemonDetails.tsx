import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, fontSize } from "../../config/theme";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import { Pokemon } from "../../types/pokemon.types";
import { FittedText } from "../utils/FittedText";

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
      <FittedText style={styles.pokemonName}>
        {pokemon.name.toUpperCase()}
      </FittedText>
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
        <FittedText>
          {favoritePokemon?.id === pokemon.id
            ? "Remove from favorites"
            : "Add to favorites"}
        </FittedText>
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
    backgroundColor: colors.favorite.add,
  },
  removeFromFavoriteButtonColor: {
    backgroundColor: colors.favorite.remove,
  },
  pokemonName: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.text.primary,
  },
});
