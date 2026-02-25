import BottomSheet from "@gorhom/bottom-sheet";
import { useImage } from "expo-image";
import { AppleMaps } from "expo-maps";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import PokemonBottomSheet from "../pokemon/PokemonBottomSheet";

export default function Map() {
  const { coordinates, storeCoordinates, pokemon } = useFavoritePokemon();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const pokemonImage = useImage(
    pokemon?.imageUrl || require("../../../assets/pokeball.png"),
  );

  return (
    <GestureHandlerRootView>
      <AppleMaps.View
        style={{ flex: 1 }}
        onMapLongPress={(e) => {
          if (!pokemon) return;
          storeCoordinates(e.coordinates);
        }}
        annotations={
          coordinates
            ? [
                {
                  coordinates,
                  textColor: "white",
                  title: "Favorite Pokemon Location",
                  icon: pokemonImage ? pokemonImage : undefined,
                },
              ]
            : []
        }
        onAnnotationClick={() => bottomSheetRef.current?.expand()}
      />

      <PokemonBottomSheet bottomSheetRef={bottomSheetRef} pokemon={pokemon} />
    </GestureHandlerRootView>
  );
}
