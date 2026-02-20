import { AppleMaps } from "expo-maps";
import { useState } from "react";
import { useFavoritePokemon } from "../contexts/FavoritePokemonContext";

export default function IOSMap() {
  const { coordinates } = useFavoritePokemon();
  const defaultCameraState = {
    coordinates: coordinates ?? { latitude: 50.048738, longitude: 19.965669 },
    zoom: 15,
  };

  return (
    <AppleMaps.View
      style={{ flex: 1 }}
      cameraPosition={defaultCameraState}
      onMapLongPress={(e) => {
        console.log("Long pressed at:", e.coordinates);
      }}
      markers={coordinates ? [{ coordinates }] : []}
    />
  );
}
