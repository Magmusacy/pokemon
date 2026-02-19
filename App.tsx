import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import PokemonListScreen from "./src/screens/PokemonListScreen";
import WorldMapScreen from "./src/screens/WorldMapScreen";
import FavoritePokemonScreen from "./src/screens/FavoritePokemonScreen";
import { FavoritePokemonProvider } from "./src/contexts/FavoritePokemonContext";

const MyTabs = createBottomTabNavigator({
  screens: {
    FavoritePokemon: FavoritePokemonScreen,
    PokemonList: PokemonListScreen,
    WorldMap: WorldMapScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <FavoritePokemonProvider>
      <Navigation />
    </FavoritePokemonProvider>
  );
}
