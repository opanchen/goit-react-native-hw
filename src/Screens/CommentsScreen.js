import { useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { CommentList } from "../components/CommentList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../redux/auth/selectors";
import { addComment, getPostById } from "../redux/posts/operations";
import { selectSinglePost } from "../redux/posts/selectors";

export const CommentsScreen = () => {
  const {
    params: { postID },
  } = useRoute();

  const [newComment, onChangeNewComment] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isBtnDisabled = newComment.trim() === "";

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById({ owner: user.email, postID }));
  }, [user, postID]);

  const post = useSelector(selectSinglePost);
  // console.log("SINGLE POST: ", post);

  const onSubmit = () => {
    if (newComment.trim() === "") return;

    dispatch(
      addComment({
        owner: user.email,
        postID,
        author: user.email,
        text: newComment,
      })
    );

    onChangeNewComment("");
  };

  const submitIcon = (
    <Icon
      name="arrow-up-circle"
      size={34}
      color={isBtnDisabled ? "#ACB3BF" : "#FF6C00"}
      style={styles.submitIcon}
    />
  );

  const windowWidth = Dimensions.get("window").width;

  return (
    <>
      {post && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-350}
            style={{
              ...styles.container,
              width: windowWidth,
            }}
          >
            <View
              style={{
                ...styles.thumb,
              }}
            >
              <Image style={styles.image} source={{ uri: post.imageURL }} />
            </View>

            <CommentList
              comments={post.comments}
              styles={
                // isKeyboardVisible
                //   ? {
                //       ...styles.commentList,
                //       bottom: 130,
                //     }
                //   :
                styles.commentList
              }
            />

            <View
              style={
                // isKeyboardVisible
                //   ? {
                //       ...styles.inputField,
                //       bottom: 48,
                //     }
                //   :
                styles.inputField
              }
            >
              <TextInput
                style={styles.textInput}
                placeholder="Коментувати..."
                placeholderTextColor={"#BDBDBD"}
                onChangeText={onChangeNewComment}
                value={newComment}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
              />
              <TouchableOpacity
                disabled={isBtnDisabled}
                onPress={onSubmit}
                style={styles.submitBtn}
              >
                {submitIcon}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingLeft: 16,
    paddingRight: 16,

    paddingTop: 32,

    // borderWidth: 1,
    // borderColor: "tomato",
  },

  // Input styles:
  inputField: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    paddingRight: 50,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    borderWidth: 1,
  },
  textInput: {
    width: "100%",
    height: 50,
    fontSize: 16,
  },
  submitBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitIcon: {
    // width: 34,
    // height: 34,
  },

  thumb: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    // marginBottom: 32, // ! ---------------!
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

  commentList: {
    flex: 2,
    position: "absolute",
    top: 304,
    left: 16,
    rigth: 16,
    bottom: 98,

    // borderWidth: 1,
    // borderColor: "teal",
  },
});
