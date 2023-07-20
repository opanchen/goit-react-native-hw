import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostScreen } from "../Screens/CreatePostScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { LogOutBtn } from "../components/LogOutBtn";
import { BackBtn } from "../components/BackBtn";

const Tab = createBottomTabNavigator();

export const PostsTabs = () => {
  const logoutBtnStyles = {
    position: "absolute",
    right: 16,
  };

  const backBtnStyles = {
    position: "absolute",
    left: 16,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let btnStyle = {
            borderRadius: 20,
            width: 70,
            height: 40,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          };

          if (route.name === "Posts") {
            iconName = focused ? "grid" : "grid-outline";
          }

          if (route.name === "Create") {
            btnStyle.backgroundColor = "#FF6C00";
            color = "#FFF";
            iconName = focused ? "add-outline" : "add-outline";
          }

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View style={btnStyle}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#212121",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle:
          route.name === "Create"
            ? { display: "none" }
            : [
                {
                  paddingTop: 8,
                  paddingBottom: 8,
                  height: 60,
                  borderTopWidth: 1,
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
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitleStyle: {},
          headerRight: () => <LogOutBtn btnStyles={logoutBtnStyles} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          title: "Створити публікаці",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {},
          headerLeft: () => <BackBtn btnStyles={backBtnStyles} />,
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
