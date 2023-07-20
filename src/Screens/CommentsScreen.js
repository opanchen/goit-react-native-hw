import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

export const CommentsScreen = () => {
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
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="Коментувати..."
            placeholderTextColor={"#BDBDBD"}
          />
          <Pressable style={styles.submitBtn}>{submitIcon}</Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    // paddingLeft: 16,
    // paddingRight: 16,
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
});
