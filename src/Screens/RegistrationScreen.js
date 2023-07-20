import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import backgroundImg from "../../assets/images/bg-pic.jpg";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const RegistrationScreen = () => {
  const [login, onChangeLogin] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const navigation = useNavigation();

  const addIcon = (
    <Icon
      name="add-circle-outline"
      size={25}
      color={"#FF6C00"}
      style={styles.addPictureBtn}
    />
  );

  const onRegister = () => {
    Alert.alert(`Credentials: ${login} ${email} ${password}`);
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
            {/* <KeyboardAvoidingView */}
            {/* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}

            {/* keyboardVerticalOffset={-75} */}
            {/* > */}
            <View style={styles.form}>
              <Text style={styles.formTitle}>Реєстрація</Text>
              <View style={styles.formFields}>
                <TextInput
                  style={styles.formInput}
                  onChangeText={onChangeLogin}
                  value={login}
                  placeholder="Логін"
                  // keyboardType="numeric"
                />
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

              <TouchableOpacity
                style={styles.signInBtnPressable}
                onPress={onRegister}
              >
                <Text style={styles.signInBtnText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <Pressable
                style={styles.logInLink}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.logInLinkText}>Вже є акаунт? Увійти</Text>
              </Pressable>

              <View style={styles.picturePlaceholder}>
                <View style={styles.addPictureBtn}>
                  <Pressable></Pressable>
                </View>
                {addIcon}
              </View>
            </View>
            {/* </KeyboardAvoidingView> */}
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
    position: "relative",
  },
  form: {
    position: "absolute",
    // bottom: 0,
    top: 189,
    left: 0,
    flex: 1,
    alignItems: "center",
    gap: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    width: "100%",
    // height: 544,
    // height: 594,
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
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
  signInBtnPressable: {
    position: "absolute",
    // bottom: 80,
    // bottom: 130,
    top: 385,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  signInBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  logInLink: {
    position: "absolute",
    // bottom: 45,
    // bottom: 95,
    top: 451,
  },
  logInLinkText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  picturePlaceholder: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPictureBtn: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    // transform: [{translateX: -Dimensions.get('window').width * 0.24}],
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 25,
    height: 25,
    // borderRadius: '50%',
    // borderWidth: 1,
    // backgroundColor: '#FFFFFF',
  },
  addPictureIcon: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // width: 50,
    // transform: [{ translateX: -Dimensions.get('window').width * 0.24 }],
  },
});
