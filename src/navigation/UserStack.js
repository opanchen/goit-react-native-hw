import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PostsTabs } from "../tabs";
import { CommentsScreen, MapScreen } from "../Screens";

const Stack = createStackNavigator();

export const UserStack = () => {
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="PostsTabs"
        component={PostsTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
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
      <Stack.Screen
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
    </Stack.Navigator>
  </NavigationContainer>;
};
