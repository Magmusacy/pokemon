import { Image } from "expo-image";
import { Text, View } from "react-native";
import { Pokemon } from "../../types/pokemon.types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#8b8b8b",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {pokemon.name.toUpperCase()}
      </Text>
      <Image
        style={{
          flex: 1,
          width: "100%",
          aspectRatio: 1,
        }}
        source={pokemon.imageUrl}
        contentFit="cover"
      />
    </View>
  );
}
