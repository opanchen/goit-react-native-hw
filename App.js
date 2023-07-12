import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { CreatePostScreen } from "./Screens/CreatePostScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/Ionicons";
// import { PostsTabs } from "./tabs/PostTabs";
// const Tab = createBottomTabNavigator();

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
            name="Posts"
            component={PostsScreen}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="Create"
            component={CreatePostScreen}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* <MainStack.Screen
            name="PostsTabs"
            component={PostsTabs}
            options={{
              headerShown: false,
            }}
          /> */}
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}
