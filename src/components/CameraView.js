import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";

export const CameraView = ({ uploadImage }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const imageIcon = (
    <Icon name="camera" size={25} color={"#BDBDBD"} style={styles.imageIcon} />
  );

  const flipIcon = (
    <Icon
      name="camera-reverse"
      size={25}
      color={"#BDBDBD"}
      style={styles.flipIcon}
    />
  );

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log("PHOTO URI: \n", uri);
      setImage(uri);
      uploadImage(uri);
      await MediaLibrary.createAssetAsync(uri);
    }
  };

  const onFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    console.log(result);
    console.log(result.uri);
    setImage(result.uri);
    uploadImage(result.uri);
  };

  if (hasPermission === null) {
    // console.log("NO PORMISSION");
    return (
      <View style={styles.picturePlaceholder}>
        <TouchableOpacity style={styles.takePhotoBtn}>
          {imageIcon}
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    // console.log("NO ACCES TO CAMERA");
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.uploadArea}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={setCameraRef}
            orientation={"landscape"}
            ratio="4:3"
          >
            <View style={styles.photoView}>
              <TouchableOpacity style={styles.flipBtn} onPress={onFlip}>
                {flipIcon}
              </TouchableOpacity>

              <TouchableOpacity style={styles.takePhotoBtn} onPress={takePhoto}>
                {imageIcon}
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}
      </View>

      {!image ? (
        <Pressable style={styles.uploadLabel} onPress={selectFile}>
          <Text style={styles.uploadLabelText}>Завантажте фото</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.uploadLabel}>
          <Text style={styles.uploadLabelText} onPress={() => setImage(null)}>
            Редагувати фото
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column",
  },
  uploadArea: {
    width: "100%",
    flex: 0,
    height: 240,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    overflow: "hidden",
  },
  camera: {
    height: "100%",
    flex: 0,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  flipBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  button: { alignSelf: "center" },
  picturePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
  },
  takePhotoBtn: {
    position: "absolute",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  imageIcon: {
    position: "absolute",
    bottom: 19,
    width: 24,
    height: 24,
  },
  flipIcon: {},
  uploadLabel: {
    marginTop: 8,
  },
  uploadLabelText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    // lineHeight: "normal",
  },
});
