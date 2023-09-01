import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import backgroundImg from "../../assets/images//bg-pic.jpg";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/auth/operations";
import { selectError, selectIsLoggedIn } from "../redux/auth/selectors";
import { ErrorView } from "../components";

export const LoginScreen = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [actionCount, setActionCount] = useState(0);
  // const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const isBtnDisabled = email.length === 0 || password.length === 0;

  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    //   if (user.email && !error) {
    if (isLoggedIn && !error) {
      navigation.navigate("PostsTabs");
    }
  }, [isLoggedIn, error]);

  const handleVisiblePassword = () => {
    setIsShownPassword(!isShownPassword);
  };

  const resetForm = () => {
    onChangeEmail("");
    onChangePassword("");
  };

  const navigateToRegister = () => {
    resetForm();
    navigation.navigate("Registration");
  };

  const onLogIn = async () => {
    if (email.trim() === "" || password.trim().length < 6) {
      setValidationError(
        "Пошта та пароль обовʼязкові! \nПароль має бути мінімум 6 символів."
      );
      setActionCount(actionCount + 1);
      return;
    }

    dispatch(logIn({ email, password }));
    setActionCount(actionCount + 1);

    resetForm();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-349}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.backgroundImg}
          >
            {error && actionCount > 0 && (
              <ErrorView text={error} boxStyles={styles.error} />
            )}
            {validationError && actionCount > 0 && (
              <ErrorView text={validationError} boxStyles={styles.error} />
            )}

            <View style={styles.form}>
              <Text style={styles.formTitle}>Увійти</Text>
              <View style={styles.formFields}>
                <TextInput
                  style={styles.formInput}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="Адреса електронної пошти"
                  // onFocus={() => setIsShownKeyboard(true)}
                />

                <View style={styles.passwordField}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={!isShownPassword}
                    placeholder="Пароль"
                    // onFocus={() => setIsShownKeyboard(true)}
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

              <Pressable
                style={
                  isBtnDisabled
                    ? {
                        ...styles.logInBtnPressable,
                        backgroundColor: "#F6F6F6",
                        borderWidth: 1,
                      }
                    : styles.logInBtnPressable
                }
                onPress={onLogIn}
                disabled={isBtnDisabled}
              >
                <Text
                  style={
                    isBtnDisabled
                      ? { ...styles.logInBtnText, color: "#BDBDBD" }
                      : styles.logInBtnText
                  }
                >
                  Увійти
                </Text>
              </Pressable>

              <View style={styles.signInRow}>
                <Text style={styles.signInRowText}>Немає акаунту? </Text>
                <Pressable onPress={navigateToRegister}>
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
  error: {
    position: "absolute",
    top: 80,
    left: 16,
    rigth: 16,
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
