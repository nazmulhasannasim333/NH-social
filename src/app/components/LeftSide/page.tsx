"use client";
import { logoutUser } from "@/src/firebase/firebaseAuth";
import { RootState } from "@/src/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import avatar from "../../../../public/images/avatar.png";
import Navbar from "../Navbar";

const LeftSide = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // console.log(user.displayName);
  const handleSignout = () => {
    logoutUser().then(() => {
      console.log("Logout Successful");
    });
  };

  return (
    <div className="lg:col-span-2 lg:flex flex-col justify-between h-screen text-white py-4 sticky top-0 overflow-hidden hidden">
      {/*left menu*/}
      <Navbar />
      <div className="dropdown dropdown-top">
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width={50}
                height={50}
                src={user && user.photoURL ? user?.photoURL : avatar}
                alt=""
              />
            </div>
          </label>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              {user && user.displayName}
            </p>
            <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              @NHnasim333
            </p>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800 text-white"
        >
          <li className="my-2">
            <Link href={user ? "/profile" : "/login"}>Profile</Link>
          </li>
          <li className="mb-2">
            {user ? (
              <Link onClick={handleSignout} href="login">
                Logout
              </Link>
            ) : (
              <Link href="login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
