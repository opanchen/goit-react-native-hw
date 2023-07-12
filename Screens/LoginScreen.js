import {
  //   Alert
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  //   TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import backgroundImg from "..//images/bg-pic.jpg";
import { useState } from "react";
// import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const navigation = useNavigation();

  const onLogIn = () => {
    navigation.navigate("Posts");
    // navigation.navigate("PostsTabs");
    // Alert.alert(`Credentials: ${email} ${password}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-249}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.backgroundImg}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>Увійти</Text>
              <View style={styles.formFields}>
                <TextInput
                  style={styles.formInput}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="Адреса електронної пошти"
                  // keyboardType="numeric"
                />

                <View style={styles.passwordField}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry
                    placeholder="Пароль"
                    // keyboardType="numeric"
                  />
                  <Pressable
                    // onPress={onPressShowPassword}
                    style={styles.showPasswordBtnPressable}
                  >
                    <Text style={styles.showPasswordBtnText}>Показати</Text>
                  </Pressable>
                </View>
              </View>

              <Pressable style={styles.logInBtnPressable} onPress={onLogIn}>
                <Text style={styles.logInBtnText}>Увійти</Text>
              </Pressable>

              <View style={styles.signInRow}>
                <Text style={styles.signInRowText}>Немає акаунту? </Text>
                <Pressable onPress={() => navigation.navigate("Registration")}>
                  <Text style={styles.signInLinkText}>Зареєструватися</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
  },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flex: 1,
    alignItems: "center",
    gap: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    width: "100%",
    height: 490,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    position: "absolute",
    top: 32,
    fontFamily: "Inter-SemiBold",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    // letterSpacing: '0.01em',
  },
  formFields: {
    flex: 1,
    gap: 16,
    width: "100%",
  },
  formInput: {
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  passwordField: {
    position: "relative",
    width: "100%",
  },
  showPasswordBtnPressable: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordBtnText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  logInBtnPressable: {
    position: "absolute",
    bottom: 180,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  logInBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  signInRow: {
    position: "absolute",
    bottom: 144,
    flex: 1,
    flexDirection: "row",
  },
  signInRowText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  signInLinkText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
