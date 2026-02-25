import { createStaticNavigation } from "@react-navigation/native";
import { FavoritePokemonProvider } from "./src/contexts/FavoritePokemonContext";
import { TabNavigation } from "./src/TabNavigation";

const Navigation = createStaticNavigation(TabNavigation);

export default function App() {
  return (
    <FavoritePokemonProvider>
      <Navigation />
    </FavoritePokemonProvider>
  );
}
