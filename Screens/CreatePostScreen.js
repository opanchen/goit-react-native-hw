import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const removeIcon = (
    <Icon
      name="trash-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.removeIcon}
    />
  );

  const imageIcon = (
    <Icon name="camera" size={25} color={"#BDBDBD"} style={styles.imageIcon} />
  );

  const locationIcon = (
    <Icon
      name="location-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.locationIcon}
    />
  );

  const picturePlaceholder = <View style={styles.picturePlaceholder}></View>;

  const onChangeTitle = () => {};
  const onChangeLocation = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.postForm}>
        <View style={styles.uploadArea}>
          {picturePlaceholder}
          <Pressable style={styles.uploadBtn}>{imageIcon}</Pressable>
        </View>
        <Pressable style={styles.uploadLabel}>
          <Text style={styles.uploadLabelText}>Завантажте фото</Text>
        </Pressable>

        <View style={styles.inputField}>
          <TextInput
            style={styles.formInput}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Назва..."
            placeholderTextColor={"#BDBDBD"}
          />
        </View>

        <View style={styles.inputField}>
          {locationIcon}
          <TextInput
            style={styles.formInput}
            onChangeText={onChangeLocation}
            value={location}
            placeholder="Місцевість..."
            placeholderTextColor={"#BDBDBD"}
          />
        </View>

        <Pressable style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Опубліковати</Text>
        </Pressable>
      </View>

      <View style={styles.tabBar}>
        <Pressable style={styles.removeBtn}>{removeIcon}</Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFF",
  },

  //  Tab Bar styles:
  tabBar: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 80,
    // borderTopWidth: 1,
    // borderTopColor: "#BDBDBD",
  },
  removeBtn: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  removeIcon: {
    width: 24,
    height: 24,
  },

  //   Post-form Styles:
  postForm: {
    position: "relative",
    width: "100%",
    marginTop: 120,
  },
  picturePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
  },
  uploadArea: {
    position: "relative",

    //for center position of uploadBtn:
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    flex: 0,
    flexDirection: "row",
    height: 240,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  uploadBtn: {
    position: "absolute",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    // borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  imageIcon: {
    position: "absolute",
    bottom: 19,
    // borderWidth: 1,
    width: 24,
    height: 24,
  },
  uploadLabel: {
    marginTop: 8,
    marginBottom: 32,
  },
  uploadLabelText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    // lineHeight: "normal",
  },

  inputField: {
    // position: "relative",
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  formInput: {
    width: "100%",
    height: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E8E8E8",
    // borderWidth: 1,
    fontSize: 16,
  },
  locationIcon: {
    // position: 'absolute',
    width: 24,
    height: 24,
    marginRight: 4,
  },
  submitBtn: {
    width: "100%",
    height: "auto",
    marginTop: 32,
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  submitBtnText: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#BDBDBD",
    // lineHeight: 22,
    // letterSpacing: -0.408,
  },
});
