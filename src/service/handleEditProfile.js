import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
let toastId;

const updateProfileDataInFirebase = (
  firstName,
  lastName,
  bio,
  portfolioLink,
  profilePictureUrl,
  currentUser
) => {
  db.collection(`users/`)
    .doc(currentUser.uid)
    .set(
      { firstName, lastName, bio, portfolioLink, profilePictureUrl },
      { merge: true }
    )
    .then(() => {
      toast.update(toastId, {
        render: "Post updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 800,
      });
    })
    .catch((error) => {
      toast.update(toastId, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 800,
      });
      console.log("Error in Updating data in firebase", error);
    });
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
  toastId = toast.loading("Updating profile...");

  if (profileImage !== currentUser.profilePictureUrl) {
    const uploadTask = storage
      .ref()
      .child(`users/${currentUser.uid}_profile.${rawData.name.split(".")[1]}`)
      .put(rawData);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {},
      (error) => {
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 800,
        });
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
