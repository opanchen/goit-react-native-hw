import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import UserDefaultAvatar from "../images/user-avatar.png";
import { posts } from "../data/posts.js";
import { Post } from "../components/Post";
import { useNavigation } from "@react-navigation/native";

export const PostsScreen = () => {
  const navigation = useNavigation();

  const logoutIcon = (
    <Icon
      name="log-out-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.logoutIcon}
    />
  );

  const gridIcon = (
    <Icon
      name="grid-outline"
      size={25}
      color={"#212121"}
      style={styles.gridIcon}
    />
  );

  const addIcon = (
    <Icon
      name="add-outline"
      size={25}
      color={"#FFFFFF"}
      style={styles.addIcon}
    />
  );

  const userIcon = (
    <Icon
      name="person-outline"
      size={25}
      color={"#212121"}
      style={styles.userIcon}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Публікації</Text>
        <Pressable
          style={styles.logoutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          {logoutIcon}
        </Pressable>
      </View>

      <View style={styles.userBox}>
        <Image style={styles.userImg} source={UserDefaultAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      <View style={styles.postList}>
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.tabBar}>
        <Pressable style={styles.gridBtn}>{gridIcon}</Pressable>
        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate("Create")}
        >
          {addIcon}
        </Pressable>

        <Pressable
          style={styles.userBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          {userIcon}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  // Header Styles:
  header: {
    position: "absolute",
    top: 48,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  heading: {
    textAlign: "center",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  logoutBtn: {
    position: "absolute",
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },

  //   User-box Styles:
  userBox: {
    position: "absolute",
    top: 120,
    left: 16,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {},
  userName: {
    color: "#212121",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 700,
    // lineHeight: "normal",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 400,
  },

  //   Post-list Styles:
  postList: {
    position: "absolute",
    top: 212,
    left: 16,
    right: 16,

    bottom: 80,
    // height: 400,
    // flex: 0,
    // gap: 32,
  },

  //  Tab Bar styles:
  tabBar: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 80,
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  gridBtn: {},
  gridIcon: {
    width: 24,
    height: 24,
  },
  addBtn: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  addIcon: {},
  userBtn: {},
});
