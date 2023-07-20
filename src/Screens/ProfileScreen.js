import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import backgroundImg from "../../assets/images/bg-pic.jpg";
import userDefaultAvatar from "../../assets/images/user-avatar.png";

import Icon from "react-native-vector-icons/Ionicons";
import { posts } from "../data";
import { PostProfile, LogOutBtn } from "../components";
// import { LogOutBtn } from "../components/LogOutBtn";

export const ProfileScreen = () => {
  const editAvatarIcon = (
    <Icon
      name="close-outline"
      size={23}
      color={"#BDBDBD"}
      style={styles.addPictureBtn}
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
          <LogOutBtn btnStyles={styles.logoutBtn} />

          <View style={styles.thumb}>
            <Image style={styles.userAvatar} source={userDefaultAvatar} />
            <Pressable style={styles.editAvatarBtn}>{editAvatarIcon}</Pressable>
          </View>

          <Text style={styles.userName}>Natali Romanova</Text>

          <View style={styles.postList}>
            <FlatList
              data={posts}
              renderItem={({ item }) => <PostProfile post={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
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
    position: "absolute",
    top: 160,
    left: 16,
    right: 16,
    bottom: 0,
  },
});
