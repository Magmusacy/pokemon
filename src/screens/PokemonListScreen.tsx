import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "../types/pokemon.types";
import PokemonCard from "../components/pokemon/PokemonCard";

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
  const isLoadingRef = useRef(false);
  const offsetRef = useRef(0);

  const fetchPokemonList = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

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
    isLoadingRef.current = false;
    offsetRef.current += LIMIT;
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReached={() => {
          fetchPokemonList();
        }}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 8,
  },
});
