import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { MainNavigationContainer } from "./src/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
  });

  if (!fontsLoaded) return null;

  return <MainNavigationContainer />;
}
