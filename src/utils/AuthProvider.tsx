"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { initAuthListener } from "../firebase/firebaseAuth";
import store from "../redux/store";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initAuthListener();
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default AuthProvider;
