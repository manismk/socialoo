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

  return (
    <UserContext.Provider value={{ allUsers }}>{children}</UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
