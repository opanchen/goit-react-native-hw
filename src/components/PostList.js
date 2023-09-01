import { useSelector } from "react-redux";
import { View, FlatList, Text } from "react-native";
import { Post } from "./Post";
import { selectPosts } from "../redux/posts/selectors";
import Icon from "react-native-vector-icons/Ionicons";

export const PostList = ({ styles }) => {
  const posts = useSelector(selectPosts);

  const arrowIcon = (
    <Icon name={"arrow-down-outline"} size={36} color={"#FF6C00"} />
  );

  return (
    <>
      {posts.length === 0 ? (
        <View style={{ ...styles, flex: 1, gap: 64 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Публікації відсутні.
          </Text>

          <View style={{ flex: 1, alignItems: "center", gap: 24 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#FF6C00",
              }}
            >
              Створити першу публікацію вже зараз
            </Text>
            {arrowIcon}
          </View>
        </View>
      ) : (
        <View style={styles}>
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.postID}
          />
        </View>
      )}
    </>
  );
};
