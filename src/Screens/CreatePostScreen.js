import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { CameraView } from "../components";
import { selectUser } from "../redux/auth/selectors";
import { addPost } from "../redux/posts/operations";

export const CreatePostScreen = () => {
  const [image, setImage] = useState(null);
  const [title, onChangeTitle] = useState("");
  const [location, onChangeLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("requestForegroundPermissionsAsync()");
          console.log("Permission to access location was denied");
          return Alert.alert(
            "У доступі до місцезнаходження відмовлено. \n Для подальшого використання даних про поточне місцезнаходження, будь ласка, змініть відповідні налаштування Вашого девайсу та спробуйте ще раз."
          );
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoordinates(coords);
        // console.log("!!!!!!!! ========> !!!!!!!!!!!!");
        // console.log("location: ", location);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [image]);

  const isSubmitBtnDisabled =
    image && title.trim().length !== 0 && location.trim().length !== 0
      ? false
      : true;

  const onFormSubmit = async () => {
    // console.log("COORDINATES ON SUBMIT FOO: ", coordinates);
    dispatch(
      addPost({ image, title, location, coordinates, owner: user.email })
    );

    onReset();
    navigation.navigate("Posts");
  };

  const onReset = () => {
    setImage(null);
    onChangeLocation("");
    onChangeTitle("");
  };

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

        <TouchableOpacity
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
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.removeBtn} onPress={onReset}>
          {removeIcon}
        </TouchableOpacity>
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
