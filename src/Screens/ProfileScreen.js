import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import backgroundImg from "../../assets/images/bg-pic.jpg";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { LogOutBtn, PostList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { useEffect } from "react";
import { fetchPosts } from "../redux/posts/operations";
import { updateAvatar } from "../redux/auth/operations";

export const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const userEmail = user.email;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts({ owner: userEmail }));
  }, [dispatch, userEmail]);

  const editAvatarIcon = (
    <Icon
      name={user.avatarURL ? "close-outline" : "add-outline"}
      size={23}
      color={"#BDBDBD"}
      style={styles.addPictureBtn}
    />
  );

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    // console.log("Selected file: ", result.uri);
    // setAvatar(result?.uri);
    return result.uri;
  };

  const handleUpdateAvatar = async () => {
    let newAvatar;
    if (!user.avatarURL) {
      newAvatar = await selectFile();
    }

    return Alert.alert(
      "Оновити аватар",
      "Підтвердження операції призведе до безповоротньої зміни аватару. ",
      [
        {
          text: "Скасувати",
          onPress: () => console.log("Cancel pressed."),
          style: "cancel",
        },
        {
          text: "Підтвердити",
          onPress: () => {
            console.log("OK pressed.");
            const avatar = newAvatar ? newAvatar : null;
            // console.log("avatar prop BEFORE DISPATCH: ", avatar);
            dispatch(updateAvatar({ avatar }));
          },
        },
      ]
    );
  };

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
            <Image
              style={styles.userAvatar}
              source={{
                uri: user.avatarURL,
              }}
            />
            <TouchableOpacity
              onPress={handleUpdateAvatar}
              style={styles.editAvatarBtn}
            >
              {editAvatarIcon}
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.login}</Text>
          <PostList styles={styles.postList} />
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
    right: -16,

    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderColor: "#BDBDBD",
    width: 32,
    height: 32,
  },
  editAvatarIcon: {
    width: 23,
    height: 23,
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
