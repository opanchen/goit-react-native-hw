#Photo App
##Expo/React-Native project for android

The application simulates a simple version of social network (as Instagram, Twitter etc.) with different features.

###Creating

This project was implemented with **Expo 48.0.18** on _hermes_ engine.
The original template was created with **[Create Expo App](https://docs.expo.dev/tutorial/create-your-first-app/)** following next commands:
`npx create-expo-app`
`npx expo start`

It has basic React Native navigation with `@react-navigation/native-stack`, `@react-navigation/stack` and `@react-navigation/bottom-tabs` for tab-navigation between main screens.

Receiving, storing and processing data takes place in **[Firebase](https://firebase.google.com/)** using API methods. The store has been managed by **[RTK](https://redux-toolkit.js.org/)** & **[Redux Persist](https://www.npmjs.com/package/redux-persist)** on client's side.

###Features

Registration & login are implemented via on start-screens with following navigation to Posts-screen. User also can add personal avatar during creating new account.

Errors of form validation or sign-in/sign-up response have been handled by custom notifications created with **[React-Native Animatable](https://www.npmjs.com/package/react-native-animatable)**.

![](https://media.giphy.com/media/Zaij3rNZvqJewzcWqK/giphy.gif) ![](https://media.giphy.com/media/Llc6eVoblzhw46XBDB/giphy.gif)

The user can pick favorite pictures from file-system (using **[Expo Document Picker](https://docs.expo.dev/versions/latest/sdk/document-picker/)**) or take brand new photos (**[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)**) and post them to his network.
![](https://media.giphy.com/media/VxgnPIOdHKqPN1PmYd/giphy.gif)

Also there is an ability to like or comment posts, as well as watch available geographic coordinates of some pictures location.
![](https://media.giphy.com/media/hK4ogiNavWnFNdEt0J/giphy.gif) ![](https://media.giphy.com/media/QJuZaWQ3KiazFhj2c3/giphy.gif)

In addition to main features, removing posts and user's avatar edit are implemented on Profile-screen.
![](https://media.giphy.com/media/yubUP5ILcL8ePuFaAi/giphy.gif) ![](https://media.giphy.com/media/TxZSVaFG8h7sbqzbBu/giphy.gif)

###Dependencies and technologies
React
React-Native
Expo
Expo Font
Expo Location
Expo Media Library
React Native Vector Icons
React Native Maps
React Native Screens
React Native Screens
React Redux
Redux Toolkit
Redux Persist
React Native Async Storage
Firebase
React Navigation
Expo Camera
... and more. Full list of dependencies is available in _`package.json`_ file.
