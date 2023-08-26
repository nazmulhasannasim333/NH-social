"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import register from "../../../../public/images/animation_llpei2ae.json";

const Register = () => {
  return (
    <div className="lg:flex justify-between items-center lg:h-[calc(100vh-68px)] py-10 lg:py-0">
      <div className=" lg:w-1/2 items-center justify-center bg-transparent">
        <div className="w-full">
          <Lottie animationData={register} loop={true} />
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
            <form>
              <div>
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Name
                </div>
                <input
                  type="text"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mt-8">
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
                <div className="font-semibold text-gray-300 tracking-wide text-lg">
                  Password
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
                  Register
                </button>
              </div>
            </form>
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
