import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import UserDefaultAvatar from "../../assets/images/user-default.jpg";
import { selectUser } from "../redux/auth/selectors";
import { getFormattedDate } from "../utils/helpers/getFormattedDate";

export const Comment = ({ comment }) => {
  const { text, createdAt, author } = comment;

  const user = useSelector(selectUser);

  const isOwnComment = author === user.email;

  const windowWidth = Dimensions.get("window").width;
  const textAreaWidht = windowWidth - 32 - 8 - 28 - 16;

  const date = getFormattedDate(createdAt);
  // console.log("date: ", date);

  return (
    <>
      <View
        // style={styles.container}
        style={
          isOwnComment
            ? { ...styles.container, flexDirection: "row-reverse" }
            : styles.container
        }
      >
        {isOwnComment ? (
          <Image style={styles.authorAvatar} source={{ uri: user.avatarURL }} />
        ) : (
          <Image style={styles.authorAvatar} source={UserDefaultAvatar} />
        )}

        <View
          style={
            isOwnComment
              ? {
                  ...styles.textArea,
                  width: textAreaWidht,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 0,
                }
              : { ...styles.textArea, width: textAreaWidht }
          }
        >
          <Text style={styles.commentText}>{text}</Text>
          <Text
            style={
              isOwnComment ? { ...styles.date, textAlign: "left" } : styles.date
            }
          >
            {date}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    gap: 16,

    marginBottom: 24,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
  },
  textArea: {
    flex: 0,
    gap: 8,

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    // padding: 16,

    // borderWidth: 1,
    // borderColor: "blue",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    color: "#212121",
    // fontFamily: "Roboto",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    textAlign: "right",
    // fontFamily: "Roboto",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
  },
});
