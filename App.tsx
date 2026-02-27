import { createStaticNavigation } from "@react-navigation/native";
import { ExpoPreventScreenshotsView } from "./modules/expo-prevent-screenshots";
import { FavoritePokemonProvider } from "./src/contexts/FavoritePokemonContext";
import { TabNavigation } from "./src/TabNavigation";

const Navigation = createStaticNavigation(TabNavigation);

export default function App() {
  return (
    <FavoritePokemonProvider>
      <ExpoPreventScreenshotsView style={{ flex: 1 }}>
        <Navigation />
      </ExpoPreventScreenshotsView>
    </FavoritePokemonProvider>
  );
}
