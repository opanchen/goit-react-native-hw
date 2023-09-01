import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { addLike, deletePost, removeLike } from "../redux/posts/operations";

export const Post = ({ post }) => {
  const {
    title,
    likes,
    isLiked,
    comments,
    imageURL,
    location,
    coordinates,
    postID,
    // createdAt,
  } = post;
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const route = useRoute();

  const hasCommens = comments.length > 0;

  const chatIcon = (
    <Icon
      name="chatbubbles-outline"
      size={25}
      color={hasCommens ? "#212121" : "#BDBDBD"}
      style={styles.chatIcon}
    />
  );

  const thumblerIcon = (
    <Icon
      name={isLiked ? "thumbs-up" : "thumbs-up-outline"}
      size={25}
      color={isLiked ? "#FF6C00" : "#BDBDBD"}
      style={styles.thumblerIcon}
    />
  );

  const locationIcon = (
    <Icon
      name="location-outline"
      size={25}
      color={coordinates ? "#212121" : "#BDBDBD"}
      style={styles.locationIcon}
    />
  );

  const trashIcon = (
    <Icon
      name="trash-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.deleteIcon}
    />
  );

  const navigateToComments = () => {
    navigation.navigate("Comments", {
      imageURL,
      comments,
      postID,
    });
  };

  const navigateToMap = () => {
    if (!coordinates) {
      return;
    }
    navigation.navigate("Map", {
      coordinates,
      locationText: location,
      title,
    });
  };

  const handleLike = () => {
    isLiked
      ? dispatch(removeLike({ owner: user.email, postID }))
      : dispatch(addLike({ owner: user.email, postID }));
  };

  const handleDelete = () => {
    return Alert.alert(
      "Видалити публікацію",
      "Підтвердження операції призведе до безповоротнього видалення публікації.",
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
            dispatch(deletePost({ owner: user.email, postID }));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.thumb}>
        <Image style={styles.image} source={{ uri: imageURL }} />
        {route.name === "Profile" && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            {trashIcon}
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bar}>
        <View style={styles.integersBox}>
          <TouchableOpacity
            style={styles.commentsBnt}
            onPress={navigateToComments}
          >
            {chatIcon}
            <Text
              style={
                hasCommens
                  ? { ...styles.commentsValue, color: "#212121" }
                  : styles.commentsValue
              }
            >
              {comments.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.likesBnt} onPress={handleLike}>
            {thumblerIcon}
            <Text
              style={
                isLiked
                  ? { ...styles.likesValue, color: "#212121" }
                  : styles.likesValue
              }
            >
              {likes}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={coordinates ? false : true}
          style={styles.location}
          onPress={navigateToMap}
        >
          {locationIcon}

          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    gap: 8,
    marginBottom: 32,
  },
  thumb: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  image: {
    flex: 1,
    width: null,
    height: null,

    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
  },

  bar: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentsBnt: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  chatIcon: {
    width: 24,
    height: 24,
  },
  commentsValue: {
    color: "#BDBDBD",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
  },
  location: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationIcon: {
    width: 24,
    height: 24,
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    textDecorationLine: "underline",
  },

  integersBox: {
    flex: 1,
    flexDirection: "row",
    gap: 24,
  },
  likesBnt: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  thumblerIcon: {
    width: 24,
    height: 24,
  },
  likesValue: {
    color: "#BDBDBD",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
  },

  deleteBtn: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "teal",

    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",

    position: "absolute",
    top: 8,
    right: 8,
  },
  deleteIcon: {
    width: 24,
    height: 24,

    backgroundColor: "#FFF",
  },
});
