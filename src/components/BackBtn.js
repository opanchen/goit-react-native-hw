import Icon from "react-native-vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const BackBtn = ({ btnStyles }) => {
  const navigation = useNavigation();

  const backIcon = (
    <Icon
      name="arrow-back-outline"
      size={25}
      color={"#212121"}
      style={styles.logoutIcon}
    />
  );

  return (
    <Pressable style={btnStyles} onPress={() => navigation.goBack()}>
      {backIcon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    left: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
