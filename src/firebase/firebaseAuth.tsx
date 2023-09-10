import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setLoading, setUser } from "../redux/features/Auth/AuthSlice";
import store from "../redux/store";
import app from "./firebase.console";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    store.dispatch(setUser(user));
    if (user) {
      axios.post(`http://localhost:5000/jwt`).then((res) => {
        localStorage.setItem("access-token", res.data.token);
        store.dispatch(setLoading(false));
      });
    } else {
      localStorage.removeItem("access-token");
    }
  });
};

export const createUser = (email: string, password: string) => {
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  setLoading(true);
  return signInWithEmailAndPassword(auth, email, password);
};

export const profileUpdate = (name: string) => {
  setLoading(true);
  return updateProfile(auth.currentUser!, {
    displayName: name,
  });
};

export const logoutUser = () => {
  setLoading(true);
  return signOut(auth);
};

export const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};
