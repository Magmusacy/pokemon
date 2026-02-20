import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/pokemon.types";
import { Coordinates } from "expo-maps/build/shared.types";

type FavoritePokemonContextType = {
  changeFavoritePokemon: (pokemon: Pokemon | null) => void;
  pokemon: Pokemon | null;
  coordinates: Coordinates | null;
  setCoordinates: (coordinates: Coordinates | null) => void;
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
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const changeFavoritePokemon = (pokemon: Pokemon | null) => {
    setPokemon(pokemon);
  };

  return (
    <FavoritePokemonContext.Provider
      value={{
        pokemon,
        changeFavoritePokemon,
        coordinates,
        setCoordinates,
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
