import "dotenv/config";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

export default {
  expo: {
    name: "goit-react-native-hw",
    slug: "goit-react-native-hw",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    android: {
      package: "com.anonymous.goitreactnativehw",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "ACCESS_MEDIA_LOCATION",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebaseApiKey: FIREBASE_API_KEY,
      firebaseAuthDomain: FIREBASE_AUTH_DOMAIN,
      firebaseDbUrl: FIREBASE_DB_URL,
      firebaseProjectId: FIREBASE_PROJECT_ID,
      firebaseStorageBucket: FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: FIREBASE_APP_ID,
      firebaseMeasurementId: FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: "945bddc1-47f4-466d-b725-e06ee45c17a9",
      },
    },
  },
};
