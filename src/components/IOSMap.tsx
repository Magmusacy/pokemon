import { AppleMaps } from "expo-maps";
import { useFavoritePokemon } from "../contexts/FavoritePokemonContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonBottomSheet from "./pokemon/PokemonBottomSheet";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export default function IOSMap() {
  const { coordinates, setCoordinates, pokemon } = useFavoritePokemon();
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <AppleMaps.View
        style={{ flex: 1 }}
        onMapLongPress={(e) => {
          if (!pokemon) return;
          setCoordinates(e.coordinates);
        }}
        markers={
          coordinates
            ? [
                {
                  coordinates,
                  tintColor: "white",
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
