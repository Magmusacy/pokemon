import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Coordinates } from "expo-maps/build/shared.types";
import { createContext, useContext, useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon.types";

type FavoritePokemonContextType = {
  changeFavoritePokemon: (pokemon: Pokemon | null) => void;
  pokemon: Pokemon | null;
  coordinates: Coordinates | null;
  storeCoordinates: (coordinates: Coordinates | null) => void;
};

type SerializedPokemonData = {
  pokemon: Pokemon | null;
  coordinates: Coordinates | null;
};

const FavoritePokemonContext = createContext<
  FavoritePokemonContextType | undefined
>(undefined);

export function FavoritePokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { getItem, setItem } = useAsyncStorage("asyncPokemonStorage");

  const savePokemonDataOnDevice = async (
    pokemonData: SerializedPokemonData,
  ) => {
    try {
      await setItem(JSON.stringify(pokemonData));
    } catch (error) {
      console.error("Error saving favorite Pokemon to device:", error);
    }
  };

  const loadPokemonDataFromDevice = async () => {
    try {
      const data = await getItem();
      if (data) {
        const parsedData: SerializedPokemonData = JSON.parse(data);
        setPokemon(parsedData.pokemon);
        setCoordinates(parsedData.coordinates);
      }
    } catch (error) {
      console.error("Error loading favorite Pokemon from device:", error);
    }
  };

  useEffect(() => {
    loadPokemonDataFromDevice();
  }, []);

  const changeFavoritePokemon = (pokemon: Pokemon | null) => {
    setPokemon(pokemon);
    const newCoordinates = pokemon ? coordinates : null;
    setCoordinates(newCoordinates);

    savePokemonDataOnDevice({
      pokemon,
      coordinates: newCoordinates,
    });
  };

  const storeCoordinates = (coordinates: Coordinates | null) => {
    setCoordinates(coordinates);

    savePokemonDataOnDevice({
      pokemon,
      coordinates,
    });
  };

  return (
    <FavoritePokemonContext.Provider
      value={{
        pokemon,
        changeFavoritePokemon,
        coordinates,
        storeCoordinates,
      }}
    >
      {children}
    </FavoritePokemonContext.Provider>
  );
}

export function useFavoritePokemon() {
  const context = useContext(FavoritePokemonContext);

  if (!context) {
    throw new Error(
      "useFavoritePokemon must be used within a FavoritePokemonProvider",
    );
  }

  return context;
}
