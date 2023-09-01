import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/operations";

export const LogOutBtn = ({ btnStyles }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const logoutIcon = (
    <Icon
      name="log-out-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.logoutIcon}
    />
  );

  const onBtnPress = async () => {
    dispatch(logOut());
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity style={btnStyles} onPress={onBtnPress}>
      {logoutIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutIcon: {
    width: 24,
    height: 24,
  },
});
