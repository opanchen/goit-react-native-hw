import { Dimensions, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

export const ErrorView = ({ text, boxStyles }) => {
  const alertIcon = (
    <Icon
      name={"alert-circle-outline"}
      size={36}
      color={"#FFF"}
      style={styles.alertIcon}
    />
  );

  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };

  const windowWidth = Dimensions.get("window").width;
  const errorBoxWidht = windowWidth - 32;

  return (
    <Animatable.View
      animation={fadeOut}
      duration={2000}
      easing="linear"
      delay={3000}
      style={{
        ...styles.errorBox,
        width: errorBoxWidht,
        ...boxStyles,
      }}
    >
      <Animatable.View animation="shake" easing="linear" duration={2000}>
        {alertIcon}
      </Animatable.View>
      <Text style={styles.errorText}>{text}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  errorBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,

    padding: 16,
    backgroundColor: "red",
    borderRadius: 8,
  },
  alertIcon: {
    // width: 32,
    // height: 32,
  },
  errorText: {
    flexGrow: 0,
    flexShrink: 1,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 19,
  },
});
