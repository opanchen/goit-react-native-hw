import { View, Text, StyleSheet, Image } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../redux/auth/selectors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { fetchPosts } from "../redux/posts/operations";
import { PostList } from "../components/PostList";

export const PostsScreen = () => {
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  // console.log("CURRENT USER: ", user.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts({ owner: user.email }));
  }, [dispatch, user]);

  if (!user) navigation.navigate("Login");

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <View style={styles.thumb}>
          <Image style={styles.userImg} source={{ uri: user.avatarURL }} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.login}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <PostList styles={styles.postList} />
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
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userImg: {
    // width: 60,
    // height: 60,
    flex: 1,
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
