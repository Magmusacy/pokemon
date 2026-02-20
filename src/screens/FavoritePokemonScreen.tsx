import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavoritePokemon } from "../contexts/FavoritePokemonContext";
import { PokemonDetails } from "../components/pokemon/PokemonDetails";
import Entypo from "@expo/vector-icons/Entypo";
import { borderRadius, colors, fontSize } from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import PokemonCamera from "../components/camera/PokemonCamera";

export default function FavoritePokemonScreen() {
  const { pokemon } = useFavoritePokemon();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {pokemon ? (
        <View style={styles.pokemonDetails}>
          <TouchableOpacity
            style={styles.camera}
            onPress={() => navigation.navigate("PokemonCamera" as never)}
          >
            <Entypo name="camera" size={fontSize.lg} color={colors.primary} />
          </TouchableOpacity>
          <PokemonDetails pokemon={pokemon} />
        </View>
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
  camera: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: borderRadius.md,
  },
  pokemonDetails: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    margin: 16,
    borderRadius: borderRadius.md,
  },
});
