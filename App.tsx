import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation } from "@react-navigation/native";
import PokemonListScreen from "./src/screens/PokemonListScreen";
import WorldMapScreen from "./src/screens/WorldMapScreen";
import FavoritePokemonScreen from "./src/screens/FavoritePokemonScreen";
import { FavoritePokemonProvider } from "./src/contexts/FavoritePokemonContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "./src/config/theme";
import PokemonCamera from "./src/components/camera/PokemonCamera";

const FavoritePokemonCameraStack = createStackNavigator({
  screens: {
    FavoritePokemon: {
      screen: FavoritePokemonScreen,
      options: {
        title: "Favorite Pokemon",
        headerShown: false,
      },
    },
    PokemonCamera: {
      screen: PokemonCamera,
      options: {
        title: "Pokemon Camera",
        headerTitle: "",
      },
    },
  },
});

const MyTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarActiveTintColor: colors.tab.active,
    tabBarInactiveTintColor: colors.tab.inactive,
    tabBarIconStyle: {
      width: 24,
      height: 24,
    },
  },
  screens: {
    FavoritePokemon: {
      screen: FavoritePokemonCameraStack,
      options: {
        title: "Favorite Pokemon",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="favorite" size={size} color={color} />
        ),
      },
    },
    PokemonList: {
      screen: PokemonListScreen,
      options: {
        title: "Pokemon List",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="catching-pokemon" size={size} color={color} />
        ),
      },
    },
    WorldMap: {
      screen: WorldMapScreen,
      options: {
        title: "World Map",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="map" size={size} color={color} />
        ),
      },
    },
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
