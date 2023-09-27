"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logoutUser } from "../firebase/firebaseAuth";

const axiosSecure = axios.create({
  baseURL: "https://nh-social-server.vercel.app",
});

const useAxiosSecure = () => {
  const router = useRouter();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logoutUser();
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [router]);

  return [axiosSecure];
};

export default useAxiosSecure;
