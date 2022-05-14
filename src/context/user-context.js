import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { useAuth } from "./auth-context";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState({ users: [], currentUser: {} });
  const { user } = useAuth();

  useEffect(() => {
    try {
      db.collection(`users`).onSnapshot((querySnapshot) => {
        setAllUsers((prev) => ({
          ...prev,
          users: querySnapshot.docs.map((user) => ({
            ...user.data(),
          })),
        }));
      });
    } catch (e) {
      console.error("Error in getting userData", e);
    }
  }, [user.uid]);

  useEffect(() => {
    setAllUsers((prev) => ({
      ...prev,
      currentUser: allUsers.users.find((us) => us.uid === user.uid),
    }));
  }, [allUsers.users, user.uid]);

  const updateProfileDataInFirebase = (
    firstName,
    lastName,
    bio,
    portfolioLink,
    profilePictureUrl
  ) => {
    try {
      db.collection(`users/`)
        .doc(user.uid)
        .set(
          { firstName, lastName, bio, portfolioLink, profilePictureUrl },
          { merge: true }
        );
      toast.success("Profile updated successfully");
    } catch (e) {
      console.log("Error in Updating data in firebase", e);
    }
  };

  const updateUserData = (
    firstName,
    lastName,
    bio,
    portfolioLink,
    profileImage,
    rawData
  ) => {
    if (profileImage !== allUsers?.currentUser.profilePictureUrl) {
      const uploadTask = storage
        .ref()
        .child(`users/${user.uid}_profile.${rawData.name.split(".")[1]}`)
        .put(rawData);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => {
          toast.error("Something Went wrong");
          console.log("Something went wrong in uploading image", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateProfileDataInFirebase(
              firstName,
              lastName,
              bio,
              portfolioLink,
              downloadURL
            );
          });
        }
      );
    } else {
      updateProfileDataInFirebase(
        firstName,
        lastName,
        bio,
        portfolioLink,
        profileImage
      );
    }
  };

  return (
    <UserContext.Provider value={{ updateUserData, allUsers }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
