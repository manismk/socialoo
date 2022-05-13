import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password, firstName, lastName) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
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

  const signIn = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        navigate(from, { replace: true });
        toast.success("Logged In Successfully");
      })
      .catch((e) => {
        console.log("Error in signIn", e);
        toast.error(e.message);
      });
  };

  const signOut = () => {
    return auth
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.log("Error in signOut", e);
      });
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
