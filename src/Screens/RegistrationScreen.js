import {
  Image,
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
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/auth/operations";
import { selectError, selectIsLoggedIn } from "../redux/auth/selectors";
import { ErrorView } from "../components";

export const RegistrationScreen = () => {
  const [login, onChangeLogin] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [actionCount, setActionCount] = useState(0);

  const isBtnDisabled =
    login.length === 0 || email.length === 0 || password.length === 0;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    // console.log("RES: ", result);
    // console.log("Selected file: ", result.uri);
    setAvatar(result?.uri);
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const reduxError = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn && !reduxError) {
      navigation.navigate("PostsTabs");
    }
  }, [isLoggedIn, reduxError]);

  const addIcon = <Icon name="add-outline" size={23} color={"#FF6C00"} />;

  const removeIcon = <Icon name="close-outline" size={23} color={"#BDBDBD"} />;

  const handleVisiblePassword = () => {
    setIsShownPassword(!isShownPassword);
  };

  const resetForm = () => {
    onChangeLogin("");
    onChangeEmail("");
    onChangePassword("");
    setAvatar(null);
  };

  const onRegister = async () => {
    if (
      login.trim() === "" ||
      email.trim() === "" ||
      password.trim().length < 6
    ) {
      setValidationError(
        "Поля логін, пошта та пароль обовʼязкові! \nПароль має бути мінімум 6 символів."
      );
      setActionCount(actionCount + 1);
      return;
    }

    dispatch(
      register({
        login,
        email,
        password,
        avatar,
      })
    );

    setActionCount(actionCount + 1);
    resetForm();

    // navigation.navigate("PostsTabs");
  };

  const navigateToLogin = () => {
    resetForm();
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-492}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.backgroundImg}
          >
            {reduxError && actionCount > 0 && (
              <ErrorView text={reduxError} boxStyles={styles.error} />
            )}
            {validationError && actionCount > 0 && (
              <ErrorView text={validationError} boxStyles={styles.error} />
            )}

            <View style={styles.form}>
              <Text style={styles.formTitle}>Реєстрація</Text>
              <View style={styles.formFields}>
                <TextInput
                  style={styles.formInput}
                  onChangeText={onChangeLogin}
                  value={login}
                  placeholder="Логін"
                />
                <TextInput
                  style={styles.formInput}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="Адреса електронної пошти"
                />

                <View style={styles.passwordField}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={!isShownPassword}
                    placeholder="Пароль"
                  />
                  <Pressable
                    onPress={handleVisiblePassword}
                    style={styles.showPasswordBtnPressable}
                  >
                    <Text style={styles.showPasswordBtnText}>
                      {isShownPassword ? "Приховати" : "Показати"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <TouchableOpacity
                style={
                  isBtnDisabled
                    ? {
                        ...styles.signInBtnPressable,
                        backgroundColor: "#F6F6F6",
                        borderWidth: 1,
                      }
                    : styles.signInBtnPressable
                }
                onPress={onRegister}
                disabled={isBtnDisabled}
              >
                <Text
                  style={
                    isBtnDisabled
                      ? { ...styles.signInBtnText, color: "#BDBDBD" }
                      : styles.signInBtnText
                  }
                >
                  Зареєстуватися
                </Text>
              </TouchableOpacity>
              <Pressable style={styles.logInLink} onPress={navigateToLogin}>
                <Text style={styles.logInLinkText}>Вже є акаунт? Увійти</Text>
              </Pressable>

              {!avatar ? (
                <View style={styles.picturePlaceholder}>
                  <Pressable onPress={selectFile} style={styles.addPictureBtn}>
                    {addIcon}
                  </Pressable>
                </View>
              ) : (
                <View style={styles.avatarContainer}>
                  <Image
                    style={{ flex: 1, borderRadius: 16 }}
                    source={{ uri: avatar }}
                  />
                  <Pressable
                    onPress={() => setAvatar(null)}
                    style={styles.removePictureBtn}
                  >
                    {removeIcon}
                  </Pressable>
                </View>
              )}
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
    position: "relative",
  },
  error: {
    position: "absolute",
    top: 40,
    left: 16,
    rigth: 16,
    zIndex: 99,
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
  avatarContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addPictureBtn: {
    position: "absolute",
    bottom: 14,
    right: -16,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",

    width: 32,
    height: 32,

    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
  },
  removePictureBtn: {
    position: "absolute",
    bottom: 14,
    right: -16,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderColor: "#BDBDBD",
    borderWidth: 1,
  },
  addPictureIcon: {},
});
