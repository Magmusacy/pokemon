import { EventEmitter } from "expo-modules-core";
import * as PreventScreenshots from "expo-prevent-screenshots";
import { Button, Text, View } from "react-native";

const emitter = new EventEmitter(PreventScreenshots);

export default function App() {
  const theme = PreventScreenshots.getTheme();
  console.log(theme);
  const nextTheme = theme === "system" ? "dark" : "system";
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{theme}</Text>
      <Button
        title="Change Theme"
        onPress={() => PreventScreenshots.setTheme(nextTheme)}
      />
    </View>
  );
}
