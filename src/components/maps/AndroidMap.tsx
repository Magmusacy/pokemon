import BottomSheet from "@gorhom/bottom-sheet";
import { useImage } from "expo-image";
import { GoogleMaps } from "expo-maps";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFavoritePokemon } from "../../contexts/FavoritePokemonContext";
import PokemonBottomSheet from "../pokemon/PokemonBottomSheet";

export function AndroidMaps() {
  const { coordinates, storeCoordinates, pokemon } = useFavoritePokemon();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const pokemonImage = useImage(
    pokemon?.imageUrl || require("../../../assets/pokeball.png"),
    {
      maxHeight: 200,
      maxWidth: 200,
    },
  );
  const defaultCoordinates = {
    latitude: 50.04885,
    longitude: 19.965532,
    zoom: 1,
  };

  return (
    <GestureHandlerRootView>
      <GoogleMaps.View
        style={{ flex: 1 }}
        onMapLongClick={(e) => {
          if (!pokemon) return;
          storeCoordinates(e.coordinates);
        }}
        cameraPosition={{ coordinates: defaultCoordinates }}
        markers={
          coordinates
            ? [
                {
                  coordinates,
                  icon: pokemonImage ? pokemonImage : undefined,
                  title: "Favorite Pokemon Location",
                },
              ]
            : []
        }
        onMarkerClick={() => bottomSheetRef.current?.expand()}
      />

      <PokemonBottomSheet bottomSheetRef={bottomSheetRef} pokemon={pokemon} />
    </GestureHandlerRootView>
  );
}
