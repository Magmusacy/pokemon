import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/pokemon.types";

type FavoritePokemonContextType = {
  changeFavoritePokemon: (pokemon: Pokemon | null) => void;
  pokemon: Pokemon | null;
  coordinates: { latitude: number; longitude: number } | null;
  setFavoritePokemonCoordinates: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
};

const FavoritePokemonContext = createContext<FavoritePokemonContextType | null>(
  null,
);

export function FavoritePokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const changeFavoritePokemon = (pokemon: Pokemon | null) => {
    setPokemon(pokemon);
  };

  const setFavoritePokemonCoordinates = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    setCoordinates(coordinates);
  };

  return (
    <FavoritePokemonContext.Provider
      value={{
        pokemon,
        changeFavoritePokemon,
        coordinates,
        setFavoritePokemonCoordinates,
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
