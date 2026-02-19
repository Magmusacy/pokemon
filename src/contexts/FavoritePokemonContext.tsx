import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/pokemon.types";

type FavoritePokemonContextType = {
  changeFavoritePokemon: (pokemon: Pokemon | null) => void;
  pokemon: Pokemon | null;
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

  const changeFavoritePokemon = (pokemon: Pokemon | null) => {
    setPokemon(pokemon);
  };

  return (
    <FavoritePokemonContext.Provider value={{ pokemon, changeFavoritePokemon }}>
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
