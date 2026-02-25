import { createStackNavigator } from "@react-navigation/stack";
import PokemonCamera from "./components/camera/PokemonCamera";
import FavoritePokemonScreen from "./screens/FavoritePokemonScreen";

export const StackNavigation = createStackNavigator({
  screens: {
    FavoritePokemon: {
      screen: FavoritePokemonScreen,
      options: {
        title: "Favorite Pokemon",
      },
    },
    PokemonCamera: {
      screen: PokemonCamera,
      options: {
        title: "Pokemon Camera",
        headerTransparent: true,
      },
    },
  },
});
