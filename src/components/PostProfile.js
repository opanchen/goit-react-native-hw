import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const PostProfile = ({ post }) => {
  const { title, likes, comments, image, location } = post;
  const navigation = useNavigation();

  const chatIcon = (
    <Icon
      name="chatbubbles-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.chatIcon}
    />
  );

  const thumblerIcon = (
    <Icon
      name="thumbs-up-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.thumblerIcon}
    />
  );

  const locationIcon = (
    <Icon
      name="location-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.locationIcon}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.thumb}>
        <Image
          style={styles.image}
          //   source={imgDefault}
          source={image}
        />
      </View>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bar}>
        <View style={styles.integersBox}>
          <Pressable
            style={styles.commentsBnt}
            onPress={() => navigation.navigate("Comments")}
          >
            {chatIcon}
            <Text style={styles.commentsValue}>{comments.length}</Text>
          </Pressable>

          <Pressable style={styles.likesBnt}>
            {thumblerIcon}
            <Text style={styles.likesValue}>{likes}</Text>
          </Pressable>
        </View>

        <View style={styles.location}>
          <Pressable onPress={() => navigation.navigate("Map")}>
            {locationIcon}
          </Pressable>
          <Pressable>
            <Text style={styles.locationText}>{location}</Text>
          </Pressable>
        </View>
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
    // resizeMode: "contain",
    // width: 340,
    // height: 240,
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
  integersBox: {
    flex: 1,
    flexDirection: "row",
    gap: 24,
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
});
