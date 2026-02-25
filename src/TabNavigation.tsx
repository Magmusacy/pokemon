import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { colors } from "./config/theme";
import PokemonListScreen from "./screens/PokemonListScreen";
import WorldMapScreen from "./screens/WorldMapScreen";
import { StackNavigation } from "./StackNavigation";

export const TabNavigation = createBottomTabNavigator({
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
      screen: StackNavigation,
      options: ({ route }) => {
        return {
          title: "Favorite Pokemon",
          headerShown: false,
          tabBarStyle:
            getFocusedRouteNameFromRoute(route) === "PokemonCamera"
              ? { display: "none" }
              : undefined,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        };
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
        headerShown: false,
        title: "World Map",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="map" size={size} color={color} />
        ),
      },
    },
  },
});
