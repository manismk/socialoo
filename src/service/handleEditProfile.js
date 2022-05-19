import { db, storage } from "../firebase";

import firebase from "firebase/compat/app";
import { toast } from "react-toastify";

const updateProfileDataInFirebase = (
  firstName,
  lastName,
  bio,
  portfolioLink,
  profilePictureUrl,
  currentUser
) => {
  try {
    db.collection(`users/`)
      .doc(currentUser.uid)
      .set(
        { firstName, lastName, bio, portfolioLink, profilePictureUrl },
        { merge: true }
      );
    toast.success("Profile updated successfully");
  } catch (e) {
    console.log("Error in Updating data in firebase", e);
  }
};

export const handleEditProfile = (
  firstName,
  lastName,
  bio,
  portfolioLink,
  profileImage,
  rawData,

  currentUser
) => {
  if (profileImage !== currentUser.profilePictureUrl) {
    const uploadTask = storage
      .ref()
      .child(`users/${currentUser.uid}_profile.${rawData.name.split(".")[1]}`)
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
            downloadURL,
            currentUser
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
      profileImage,
      currentUser
    );
  }
};
