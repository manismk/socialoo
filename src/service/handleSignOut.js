import { auth } from "../firebase";

export const handleSignOut = (navigate) => {
  auth
    .signOut()
    .then(() => {
      navigate("/login");
    })
    .catch((e) => {
      console.log("Error in signOut", e);
    });
};
