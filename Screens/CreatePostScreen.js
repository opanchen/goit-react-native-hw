import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { CameraView } from "../components/CameraView";

export const CreatePostScreen = () => {
  const [image, setImage] = useState(null);
  const [title, onChangeTitle] = useState("");
  const [location, onChangeLocation] = useState("");

  const removeIcon = (
    <Icon
      name="trash-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.removeIcon}
    />
  );

  const locationIcon = (
    <Icon
      name="location-outline"
      size={25}
      color={"#BDBDBD"}
      style={styles.locationIcon}
    />
  );

  const isSubmitBtnDisabled =
    image && title.trim().length !== 0 && location.trim().length !== 0
      ? false
      : true;

  const onFormSubmit = () => {
    console.log("Title: ", title, "\n", "Location: ", location);
  };

  const onReset = () => {
    setImage(null);
    onChangeLocation("");
    onChangeTitle("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.postForm}>
        <CameraView uploadImage={setImage} />

        <View style={{ marginTop: 32 }}>
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
        </View>

        <Pressable
          disabled={isSubmitBtnDisabled}
          style={
            isSubmitBtnDisabled
              ? styles.submitBtnDisabled
              : styles.submitBtnActive
          }
          onPress={onFormSubmit}
        >
          <Text
            style={
              isSubmitBtnDisabled
                ? styles.submitBtnTextDisable
                : styles.submitBtnTextActive
            }
          >
            Опубліковати
          </Text>
        </Pressable>
      </View>

      <View style={styles.tabBar}>
        <Pressable style={styles.removeBtn} onPress={onReset}>
          {removeIcon}
        </Pressable>
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
    paddingTop: 32,
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

    // marginTop: 120,
  },
  picturePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
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
  submitBtnDisabled: {
    width: "100%",
    height: "auto",
    marginTop: 32,
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    // color: "#BDBDBD",
  },
  submitBtnActive: {
    width: "100%",
    height: "auto",
    marginTop: 32,
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  submitBtnTextDisable: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#BDBDBD",
  },
  submitBtnTextActive: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#FFF",
  },
});
