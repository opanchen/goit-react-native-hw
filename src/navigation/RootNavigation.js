import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CommentsScreen,
  LoginScreen,
  MapScreen,
  RegistrationScreen,
} from "../Screens";
import { PostsTabs } from "../tabs";
import { useAuthentication } from "../utils/hooks";

export const RootNavigation = () => {
  const MainStack = createStackNavigator();
  const { user } = useAuthentication();
  // console.log("NAVIGATION - USER: ", user);

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName={user ? "PostsTabs" : "Login"}>
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

          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Карта",
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
};
