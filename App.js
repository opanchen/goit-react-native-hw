import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";

import { PostsTabs } from "./tabs/PostsTabs";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
  });

  if (!fontsLoaded) return null;

  const MainStack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="PostsTabs"
            component={PostsTabs}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              title: "Коментарі",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#FFF",
                borderBottomWidth: 1,
              },
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}
