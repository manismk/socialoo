import { toast } from "react-toastify";
import { auth, db } from "../firebase";

export const handleSignUp = (
  email,
  password,
  firstName,
  lastName,
  location,
  navigate
) => {
  const from = location.state?.from?.pathname || "/";

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      navigate(from, { replace: true });
      toast.success("Signed Up Successfully");
      db.collection(`users/`).doc(response.user.uid).set({
        firstName,
        lastName,
        mailId: email,
        bio: "I am a new socialoo user",
        profilePictureUrl:
          "https://firebasestorage.googleapis.com/v0/b/socialoo-e8f1c.appspot.com/o/profile-default.jpg?alt=media&token=2eaaa7f6-3f12-401b-b784-41deb1583aed",
        portfolioLink: "",
        uid: response.user.uid,
        saved: [],
        followers: [],
        following: [],
      });
    })
    .catch((e) => {
      console.log("Error in signUp", e);
      toast.error(e.message);
    });
};
