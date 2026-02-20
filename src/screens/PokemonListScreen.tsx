import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Pokemon } from "../types/pokemon.types";
import PokemonCard from "../components/pokemon/PokemonCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "../config/theme";
import PokemonBottomSheet from "../components/pokemon/PokemonBottomSheet";

// move some of these things to some config later on.

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

export default function PokemonListScreen() {
  const LIMIT = 100;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(0);
  const [clickedPokemon, setClickedPokemon] = useState<Pokemon | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isFetchingRef = useRef(false);

  const handleClickedPokemon = (pokemon: Pokemon) => {
    setClickedPokemon(pokemon);
    bottomSheetRef.current?.expand();
  };

  const handleRefresh = async () => {
    if (isLoading) return;
    setPokemonList([]);
    offsetRef.current = 0;
    await fetchPokemonList();
  };

  const fetchPokemonList = useCallback(async () => {
    console.log(offsetRef.current);
    if (isLoading || isFetchingRef.current) return;
    isFetchingRef.current = true;
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
    const pokemons = data.pokemons.map((pokemon: any) => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl:
        pokemon.pokemonsprites[0].sprites.other["official-artwork"]
          .front_default,
    }));
    setPokemonList((prev) => [...prev, ...pokemons]);
    setIsLoading(false);
    isFetchingRef.current = false;
    offsetRef.current += LIMIT;
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

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
          onEndReachedThreshold={0.2}
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
