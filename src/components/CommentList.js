import {
  // FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Comment } from "./Comment";

export const CommentList = ({ comments, styles }) => {
  return (
    <SafeAreaView style={styles}>
      {/* <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item.createdAt}
        contentContainerStyle={{ flexGrow: 1, flex: 1 }}
        // refreshing={true}
      /> */}

      <ScrollView>
        {comments.map((comment) => (
          <Comment key={comment.createdAt} comment={comment} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
