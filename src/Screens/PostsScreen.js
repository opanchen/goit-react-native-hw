import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import UserDefaultAvatar from "../../assets/images/user-avatar.png";
import { posts } from "../data";
import { Post } from "../components";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  //   User-box Styles:
  userBox: {
    position: "absolute",
    top: 32,
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
    top: 124,
    left: 16,
    right: 16,
    bottom: 0,
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
});
