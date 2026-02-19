import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavoritePokemon } from "../contexts/FavoritePokemonContext";
import { PokemonDetails } from "../components/pokemon/PokemonDetails";

export default function FavoritePokemonScreen() {
  const { pokemon, changeFavoritePokemon } = useFavoritePokemon();

  return (
    <View style={styles.container}>
      {pokemon ? (
        <PokemonDetails pokemon={pokemon} />
      ) : (
        <Text>No favorite Pokemon selected 😢</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
