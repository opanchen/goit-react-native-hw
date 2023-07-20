import Icon from "react-native-vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const LogOutBtn = ({ btnStyles }) => {
  const navigation = useNavigation();

  const logoutIcon = (
    <Icon
      name="log-out-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.logoutIcon}
    />
  );

  return (
    <Pressable style={btnStyles} onPress={() => navigation.navigate("Login")}>
      {logoutIcon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutIcon: {
    width: 24,
    height: 24,
  },
});
