// import React from 'react';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";

// const auth = getAuth();

export const useAuthentication = () => {
  //   const [user, setUser] = React.useState<User>();
  //   const navigation = useNavigation();
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
  };
};
