/* eslint-disable react/no-unescaped-entities */
"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import login from "../../../../public/images/animation_llpcwk02.json";

const LoginPage = () => {
  return (
    <div className="lg:flex justify-between items-center lg:h-[calc(100vh-68px)] py-10 lg:py-0">
      <div className="lg:w-1/2">
        <div className="px-8 sm:px-24 md:px-40 lg:px-12 xl:px-24 xl:max-w-2xl">
          <div
            className="text-center text-2xl font-semibold lg:text-4xl
              xl:text-bold mb-20"
          >
            <span className="text-blue-800 ">Welcome to</span>{" "}
            <Link href="/">NH Social</Link>
          </div>
          <div className="mt-12">
            <form>
              <div>
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Email
                </div>
                <input
                  type="email"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-300 tracking-wide text-lg">
                    Password
                  </div>
                  <div>
                    <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-80 cursor-pointer">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  type="password"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                          shadow-lg"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
              Don't have an account ?{" "}
              <Link
                href="/register"
                className="cursor-pointer text-md text-blue-600 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:w-1/2 items-center justify-center bg-transparent">
        <div className="w-full">
          <Lottie animationData={login} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
