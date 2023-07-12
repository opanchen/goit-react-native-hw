import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostScreen } from "../Screens/CreatePostScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export const PostsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let btnStyle = {
            borderWidth: 1,
            width: 70,
            height: 40,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          };

          if (route.name === "Posts") {
            iconName = focused ? "grid-outline" : "grid-outline";
          }

          if (route.name === "Create") {
            iconName = focused ? "add-outline" : "add-outline";
          }

          if (route.name === "Profile") {
            iconName = focused ? "person-outline" : "person-outline";
          }

          return (
            <View style={btnStyle}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            flex: 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            borderWidth: 3,
            // gap: 0,
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          // headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerTitleStyle: {},
          // headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          // headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerTitleStyle: {},
          // headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
