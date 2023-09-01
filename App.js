//

import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootNavigation } from "./src/navigation";
import { persistor, store } from "./src/redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
