import { toast } from "react-toastify";
import { auth } from "../firebase";

export const handleSignIn = (email, password, location, navigate) => {
  const from = location.state?.from?.pathname || "/";
  auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      navigate(from, { replace: true });
      toast.success("Logged In Successfully");
    })
    .catch((e) => {
      console.log("Error in signIn", e);
      toast.error(e.message);
    });
};
