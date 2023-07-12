import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

export const CommentsScreen = () => {
  const navigation = useNavigation();

  const backIcon = (
    <Icon
      name="arrow-back-outline"
      size={25}
      color={"#212121"}
      style={styles.logoutIcon}
    />
  );

  const submitIcon = (
    <Icon
      name="arrow-up-circle"
      size={34}
      color={"#FF6C00"}
      style={styles.submitIcon}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-230}
        style={styles.container}
      >
        {/* <View style={styles.container}> */}
        <View style={styles.header}>
          <Pressable
            style={styles.backBtn}
            onPress={() => navigation.navigate("Posts")}
          >
            {backIcon}
          </Pressable>
          <Text style={styles.heading}>Коментарі</Text>
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            //   onChangeText={onChangeLocation}
            //   value={location}
            placeholder="Коментувати..."
            placeholderTextColor={"#BDBDBD"}
          />
          <Pressable style={styles.submitBtn}>{submitIcon}</Pressable>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingLeft: 16,
    // paddingRight: 16,
  },

  // Header Styles:
  header: {
    position: "absolute",
    top: 48,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  heading: {
    color: "#212121",
    textAlign: "center",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  backBtn: {
    position: "absolute",
    left: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },

  inputField: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    paddingRight: 50,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  textInput: {
    width: "100%",
    // flex: 1,
    height: 50,
    fontSize: 16,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 20,
  },
  submitBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // width: 34,
    // height: 34,
  },
  submitIcon: {
    // width: 34,
    // height: 34,
  },
});
