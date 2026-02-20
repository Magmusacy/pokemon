import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pokemon } from "../types/pokemon.types";
import PokemonCard from "../components/pokemon/PokemonCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PokemonDetails } from "../components/pokemon/PokemonDetails";
import { BlurView } from "expo-blur";
import { borderRadius, colors } from "../config/theme";
import PokemonBottomSheet from "../components/pokemon/PokemonBottomSheet";

const POKEMON_LIST_QUERY = `
query getPokemonList($limit: Int, $offset: Int) {
  pokemons: pokemon(
    limit: $limit,
    offset: $offset
  ) {
    name
    id
    pokemonsprites {
      sprites 
    }
  }
}`;

// TODO: read up on ref vs state, check if pagination works correctly
export default function PokemonListScreen() {
  // move some of these things to some config later on.
  const LIMIT = 100;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(0);
  const [clickedPokemon, setClickedPokemon] = useState<Pokemon | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClickedPokemon = (pokemon: Pokemon) => {
    setClickedPokemon(pokemon);
    bottomSheetRef.current?.expand();
  };

  const handleRefresh = async () => {
    setPokemonList([]);
    offsetRef.current = 0;
    await fetchPokemonList();
  };

  const fetchPokemonList = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await fetch("https://graphql.pokeapi.co/v1beta2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: POKEMON_LIST_QUERY,
        variables: {
          limit: LIMIT,
          offset: offsetRef.current,
        },
      }),
    });

    const { data } = await res.json();
    // any?
    const pokemons = data.pokemons.map((pokemon: any) => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl:
        pokemon.pokemonsprites[0].sprites.other["official-artwork"]
          .front_default,
    }));
    setPokemonList((prev) => [...prev, ...pokemons]);
    setIsLoading(false);
    offsetRef.current += LIMIT;
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              handleClickedPokemon={handleClickedPokemon}
            />
          )}
          onEndReached={() => {
            fetchPokemonList();
          }}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          contentContainerStyle={styles.contentContainer}
        />
      </View>

      <PokemonBottomSheet
        bottomSheetRef={bottomSheetRef}
        pokemon={clickedPokemon}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 8,
  },
});
