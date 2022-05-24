import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";

const initialState = {
  user: null,
  loginLoading: false,
  signUpLoading: false,
};

export const handleSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password, location, navigate }, thunkAPI) => {
    const from = location.state?.from?.pathname || "/";
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Logged In Successfully");
      })
      .catch((e) => {
        console.log("Error in signIn", e);
        toast.error(e.message);
      });
  }
);
export const handleSignUp = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password, firstName, lastName, location, navigate },
    thunkAPI
  ) => {
    const from = location.state?.from?.pathname || "/";

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection(`users/`)
          .doc(response.user.uid)
          .set({
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
          })
          .then(() => {
            navigate(from, { replace: true });
            toast.success("Signed Up Successfully");
          });
      })
      .catch((e) => {
        console.log("Error in signUp", e);
        toast.error(e.message);
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [handleSignIn.pending]: (state) => {
      state.loginLoading = true;
    },
    [handleSignIn.fulfilled]: (state) => {
      state.loginLoading = false;
    },
    [handleSignIn.rejected]: (state) => {
      state.loginLoading = false;
    },
    [handleSignUp.pending]: (state) => {
      state.signUpLoading = true;
    },
    [handleSignUp.fulfilled]: (state) => {
      state.signUpLoading = false;
    },
    [handleSignUp.rejected]: (state) => {
      state.signUpLoading = false;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
