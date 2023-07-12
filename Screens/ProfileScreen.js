import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import backgroundImg from "..//images/bg-pic.jpg";
import userDefaultAvatar from "../images/user-avatar.png";

import Icon from "react-native-vector-icons/Ionicons";
import { posts } from "../data/posts.js";
import { PostProfile } from "../components/PostProfile";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const editAvatarIcon = (
    <Icon
      name="close-outline"
      size={23}
      color={"#BDBDBD"}
      style={styles.addPictureBtn}
    />
  );

  const logoutIcon = (
    <Icon
      name="log-out-outline"
      size={28}
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
      color={"#212121"}
      style={styles.addIcon}
    />
  );

  const userIcon = (
    <Icon
      name="person-outline"
      size={25}
      color={"#FFFFFF"}
      style={styles.userIcon}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <View style={styles.wrapper}>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => navigation.navigate("Login")}
          >
            {logoutIcon}
          </Pressable>

          <View style={styles.thumb}>
            {/* <View style={styles.editAvatarBtn}> */}
            <Image style={styles.userAvatar} source={userDefaultAvatar} />
            <Pressable style={styles.editAvatarBtn}>{editAvatarIcon}</Pressable>
            {/* </View> */}
          </View>

          <Text style={styles.userName}>Natali Romanova</Text>

          <View style={styles.postList}>
            <FlatList
              //   style={styles.postList}
              data={posts}
              renderItem={({ item }) => <PostProfile post={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        <View style={styles.tabBar}>
          <Pressable
            style={styles.gridBtn}
            onPress={() => navigation.navigate("Posts")}
          >
            {gridIcon}
          </Pressable>
          <Pressable style={styles.userBtn}>{userIcon}</Pressable>
          <Pressable
            style={styles.addBtn}
            onPress={() => navigation.navigate("Create")}
          >
            {addIcon}
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    position: "absolute",
    top: 147,
    bottom: 0,
    width: "100%",
    flex: 0,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    // height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  thumb: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userAvatar: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 16,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 14,
    right: -12.5,

    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderColor: "#BDBDBD",
  },
  editAvatarIcon: {
    width: 25,
    height: 25,
  },
  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },

  userName: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: 0.3,
  },

  //   Post-list Styles:
  postList: {
    // borderWidth: 1,
    position: "absolute",
    top: 160,
    left: 16,
    right: 16,

    bottom: 80,
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
  userBtn: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  addIcon: {},
  addBtn: {},
});
