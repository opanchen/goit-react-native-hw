import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  getStorage,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const uploadImageToBD = async ({ type, uri, name }) => {
  // console.log("!!! --- uploading to DB \n type: ", type);
  const fetchResponse = await fetch(uri);
  const blobFile = await fetchResponse.blob();
  // console.log(blobFile);

  const storage = getStorage();

  let imageRef;
  if (type === "avatar") {
    imageRef = ref(storage, `avatars/${name}`);
  }

  if (type === "media") {
    imageRef = ref(storage, `media/${name}`);
  }

  if (type !== "avatar" && type !== "media") {
    console.log("Unexpected upload type! Check out operation function.");
    return;
  }

  const uploadTask = uploadBytesResumable(imageRef, blobFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload:", progress + "% done");
        // onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadURL,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

const registerUser = async ({ login, email, password, avatar }) => {
  // try {
  await createUserWithEmailAndPassword(auth, email, password);

  if (!avatar) {
    await updateProfile(auth.currentUser, {
      displayName: login,
      photoURL: null,
    });
  } else {
    const fileName = avatar.substring(avatar.lastIndexOf("/") + 1);

    const uploadResponse = await uploadImageToBD({
      type: "avatar",
      uri: avatar,
      name: fileName,
    });
    // console.log("UPLOAD RESPONSE: ", uploadResponse?.downloadURL);

    await updateProfile(auth.currentUser, {
      displayName: login,
      photoURL: uploadResponse?.downloadURL,
    });
  }
  // console.log("Register to user: ", auth.currentUser?.displayName);
  return auth.currentUser;
};

const updateAvatar = async ({ avatar }) => {
  if (avatar === null) {
    // console.log("Update avatar: NULL");
    // console.log("auth.currentUser: ", auth.currentUser);
    try {
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
    } catch (error) {
      console.log("updateProfile ERROR: ", error);
    }
    // finally {
    //   console.log(
    //     "Profile updated: \n NEW AUTH.CURRENT_USER: ",
    //     auth.currentUser
    //   );
    // }

    const res = {
      status: "ok",
      message: "avatar deleted",
      avatarURL: null,
    };

    return res;
  }

  const fileName = avatar.substring(avatar.lastIndexOf("/") + 1);

  const uploadResponse = await uploadImageToBD({
    type: "avatar",
    uri: avatar,
    name: fileName,
  });
  // console.log("UPLOAD RESPONSE: ", uploadResponse?.downloadURL);

  if (!uploadResponse.downloadURL) {
    console.log("Upload error. Check out operation function.");
    return;
  }

  await updateProfile(auth.currentUser, {
    photoURL: uploadResponse?.downloadURL,
  });

  // console.log("Profile updated...");
  const res = {
    status: "ok",
    avatarURL: uploadResponse.downloadURL,
  };
  return res;
};

const loginUser = async ({ email, password }) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  // console.log("LogIn to user: ", credentials.user.displayName);
  return credentials.user;
};

const logoutUser = async () => {
  //   const auth = getAuth();
  await signOut(auth);
  console.log("User logged out.");
};

const addPost = async ({ image, title, location, coordinates, owner }) => {
  fileName = image.substring(image.lastIndexOf("/") + 1);
  const uploadResponse = await uploadImageToBD({
    type: "media",
    uri: image,
    name: fileName,
  });
  // console.log("UPLOAD RESPONSE: ", uploadResponse?.downloadURL);
  const imageURL = uploadResponse.downloadURL;

  const date = Date.now();

  const newPost = {
    imageURL,
    title,
    location,
    coordinates,
    likes: 0,
    isLiked: false,
    comments: [],
    createdAt: date,
  };
  // console.log("future newPost: ", newPost);

  const newPostRef = doc(collection(db, "media", "posts", `${owner}`));
  await setDoc(newPostRef, newPost);
  // console.log("New post is created");
  // console.log("New post ID: ", newPostRef.id);
  newPost.postID = newPostRef.id;
  return newPost;
};

const deletePost = async ({ owner, postID }) => {
  const postRef = doc(db, "media", "posts", `${owner}`, `${postID}`);

  await updateDoc(postRef, {
    comments: deleteField(),
    coordinates: deleteField(),
    createdAt: deleteField(),
    imageURL: deleteField(),
    isLiked: deleteField(),
    likes: deleteField(),
    location: deleteField(),
    title: deleteField(),
  });

  // console.log("Document's fields were deleted...");

  await deleteDoc(doc(db, "media", "posts", `${owner}`, `${postID}`));

  // console.log("Document was deleted...");

  const res = {
    message: "Document was deleted...",
    postID,
    owner,
  };

  return res;
};

const getPostsCollection = async ({ owner }) => {
  const querySnapshot = await getDocs(
    collection(db, "media", "posts", `${owner}`)
  );

  // querySnapshot.forEach((doc) => console.log(doc.id, " =====>> ", doc.data()));

  const res = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.postID = doc.id;
    data.owner = owner;
    res.push(data);
  });

  // console.log("FUNCTION RESULT: ", res);
  return res;
};

const getPostByID = async ({ owner, postID }) => {
  const postRef = doc(db, "media", "posts", `${owner}`, `${postID}`);

  const docSnapshot = await getDoc(postRef);

  if (docSnapshot.exists()) {
    // console.log("Document data:", docSnapshot.data());
    const post = {
      ...docSnapshot.data(),
      owner,
    };
    // return docSnapshot.data();
    return post;
  }

  console.log("No such document!");
};

const addComment = async ({ owner, postID, author, text }) => {
  const date = Date.now();

  const newComment = {
    author,
    text,
    createdAt: date,
  };

  const postRef = doc(db, "media", "posts", `${owner}`, `${postID}`);

  await updateDoc(postRef, {
    comments: arrayUnion(newComment),
  });

  // console.log("check document update...");
  return newComment;
};

const addLikeToPost = async ({ owner, postID }) => {
  const postRef = doc(db, "media", "posts", `${owner}`, `${postID}`);

  const docSnapshot = await getDoc(postRef);

  if (!docSnapshot.exists()) {
    console.log("No such document!");
    return;
  }

  const post = docSnapshot.data();

  const isLiked = post.isLiked;

  if (isLiked) {
    console.log("This post is already liked.");
    return;
  }

  await updateDoc(postRef, {
    isLiked: true,
    likes: post.likes + 1,
  });

  // console.log("check document update...");
  const res = {
    message: "The post is liked.",
    owner,
    postID,
  };
  return res;
};

const removeLikeFromPost = async ({ owner, postID }) => {
  const postRef = doc(db, "media", "posts", `${owner}`, `${postID}`);

  const docSnapshot = await getDoc(postRef);

  if (!docSnapshot.exists()) {
    console.log("No such document!");
    return;
  }

  const post = docSnapshot.data();

  const isLiked = post.isLiked;

  if (!isLiked) {
    console.log("This post isn't liked yet.");
    return;
  }

  await updateDoc(postRef, {
    isLiked: false,
    likes: post.likes - 1,
  });

  // console.log("check document update...");
  const res = {
    message: "The post isn't liked.",
    owner,
    postID,
  };
  return res;
};

export const firebaseAPI = {
  uploadImageToBD,
  registerUser,
  loginUser,
  logoutUser,
  updateAvatar,
  addPost,
  deletePost,
  getPostsCollection,
  getPostByID,
  addComment,
  addLikeToPost,
  removeLikeFromPost,
};
