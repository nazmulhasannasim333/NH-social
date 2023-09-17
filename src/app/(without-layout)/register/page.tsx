"use client";
import {
  createUser,
  logoutUser,
  profileUpdate,
} from "@/src/firebase/firebaseAuth";
import axios from "axios";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import registerLottie from "../../../../public/images/animation_llpei2ae.json";

// export const metadata: Metadata = {
//   title: "NH Social || Register",
//   description: "NH Social App",
// };

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showError, setShowError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    const userName = `${data.email.slice(0, 10)}${Math.floor(
      Math.random() * 1000
    )}`;

    axios
      .post("https://nh-social-server.vercel.app/user", {
        name: data.name,
        email: data.email,
        photo: "",
        user_name: userName,
        date: new Date(),
      })
      .then((res) => {
        console.log(res.data);
      });

    setShowError("");
    createUser(data.email, data.password)
      .then((result) => {
        const signupUser = result.user;
        reset();
        console.log(signupUser);
        profileUpdate(data.name)
          .then(() => {
            console.log("profile updated");
            logoutUser();
            router.push("/login");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
        setShowError(error.message);
      });
  };

  return (
    <div className="lg:flex justify-between items-center lg:h-[calc(100vh-68px)] py-10 lg:py-0">
      <div className=" lg:w-1/2 items-center justify-center bg-transparent">
        <div className="w-full">
          <Lottie animationData={registerLottie} loop={true} />
        </div>
      </div>
      <div className="lg:w-1/2">
        <div className="px-8 sm:px-24 md:px-40 lg:px-12 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-2xl font-semibold lg:text-4xl
          xl:text-bold "
          >
            <span className="text-blue-800">Welcome to</span>{" "}
            <Link href="/">NH Social</Link>
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Name
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mt-8">
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Email
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="font-semibold text-gray-300 tracking-wide text-lg">
                  Password
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                      shadow-lg"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center text-red-500 pt-5">
              {showError && showError}
            </p>
            <div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="cursor-pointer text-md text-blue-600 hover:text-blue-800"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
