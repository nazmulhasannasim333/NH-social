"use client";
import { logoutUser } from "@/src/firebase/firebaseAuth";
import useMyPosts from "@/src/hooks/useMyPost";
import useUser from "@/src/hooks/userUser";
import { RootState } from "@/src/redux/store";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBookReader,
  FaCalendarAlt,
  FaFacebookMessenger,
  FaHome,
  FaLink,
  FaMailBulk,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegBell,
  FaUserMd,
} from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector } from "react-redux";
import avatar from "../../../../public/images/avatar.png";
import verified from "../../../../public/images/verified.png";
import EditPost from "../../components/EditPost";
import Like from "../../components/Like";
import { Post } from "../../components/MiddlePost/page";
import ProfileUpdateModal from "../../components/ProfileUpdateModal";
// export const metadata: Metadata = {
//   title: "NH Social || Profile",
//   description: "NH Social App",
// };

interface User {
  name: string;
  email: string;
  photo: string;
  user_name: string;
}

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [myPost, isLoading, refetch] = useMyPosts();
  const [editModes, setEditModes] = useState<{ [postId: string]: boolean }>({});
  const [loggedUser, isUserLoading, userRefetch] = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignout = () => {
    logoutUser().then(() => {
      console.log("Logout Successful");
    });
  };

  // Function to handle "Edit" button click
  const handleEditClick = (postId: string) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [postId]: !prevEditModes[postId], // Toggle the edit mode for this post
    }));
  };

  return (
    <div className="col-span-4 h-auto border border-y-0 border-gray-800">
      {/*Content (Center)*/}
      {/* Nav back*/}
      <div>
        <div className="flex justify-start items-center">
          <div className="px-4 py-2 mx-2">
            <Link
              href="/"
              className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <FaArrowLeft />
            </Link>
          </div>
          <div className="m-2">
            <h2 className="mb-0 text-xl font-bold text-white">
              {user && user?.displayName}
            </h2>
            <p className="mb-0 w-48 text-xs text-gray-400">
              {myPost.length} Posts
            </p>
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
      {/* User card*/}
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage:
              "url(https://images.pexels.com/photos/634688/pexels-photo-634688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          }}
        >
          <Image
            width={100}
            height={100}
            className="opacity-0 w-full h-full"
            src="https://images.pexels.com/photos/12222247/pexels-photo-12222247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* Avatar */}
            <div className="flex flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative avatar"
                >
                  <Zoom>
                    <Image
                      width={100}
                      height={100}
                      style={{ height: "9rem", width: "9rem" }}
                      className="md rounded-full relative border-4 border-gray-900"
                      src={
                        loggedUser && loggedUser.photo
                          ? loggedUser?.photo
                          : avatar
                      }
                      alt=""
                    />
                  </Zoom>

                  <div className="absolute" />
                </div>
              </div>
            </div>
            {/* Follow Button */}
            <div className="flex flex-col text-right">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800  items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
              >
                Edit Profile
              </button>
              <ProfileUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
          {/* Profile info */}
          <div className="space-y-1 justify-center w-full mt-3 ml-3">
            {/* User basic*/}
            <div>
              <div className="flex items-center gap-x-1">
                <h2 className="text-xl leading-6 font-bold text-white">
                  {loggedUser && loggedUser?.name}
                </h2>
                {loggedUser && loggedUser.photo && (
                  <Image
                    width={100}
                    height={100}
                    className="h-4 w-4 rounded-full"
                    src={verified}
                    alt="verified"
                    title="NH Social confirmed this profile is authentic"
                  />
                )}
              </div>
              <p className="text-sm leading-5 font-medium text-slate-500">
                @{loggedUser && loggedUser?.user_name}
              </p>
            </div>
            {/* Description and others */}
            <div className="pt-3">
              <p className="text-white leading-tight mb-2 text-xl">
                {loggedUser?.about && loggedUser?.about}
              </p>

              <div className="text-gray-600">
                <span className="flex mr-2 mt-2 ">
                  <FaBookReader />
                  <span className="leading-5 ml-2 text-slate-300">
                    {loggedUser.university ? (
                      loggedUser.university
                    ) : (
                      <span className="text-gray-500">Add University</span>
                    )}
                  </span>
                </span>
                <span className="flex mr-2 mt-2 ">
                  <FaMapMarkerAlt />
                  <span className="leading-5 ml-2 text-slate-300">
                    {loggedUser.address ? (
                      loggedUser.address
                    ) : (
                      <span className="text-gray-500">Add Home Town</span>
                    )}
                  </span>
                </span>
                <span className="flex mr-2 mt-2 ">
                  <FaUserMd />
                  <span className="leading-5 ml-2 text-slate-300">
                    {loggedUser.gender ? (
                      loggedUser.gender
                    ) : (
                      <span className="text-gray-500">Add Gender</span>
                    )}
                  </span>
                </span>
                <span className="flex mr-2 mt-2 ">
                  <FaMailBulk />
                  <span className="leading-5 ml-2 text-slate-300">
                    {loggedUser && loggedUser.email}
                  </span>
                </span>
                <span className="flex mr-2 mt-2 ">
                  <FaPhoneAlt />
                  <span className="leading-5 ml-2 text-slate-300">
                    {loggedUser.phone ? (
                      loggedUser.phone
                    ) : (
                      <span className="text-gray-500">Add Phone Number</span>
                    )}
                  </span>
                </span>
                <span className="flex mr-2 mt-2">
                  <FaLink />
                  <span className="leading-5 ml-2 text-blue-400">
                    <a
                      href={loggedUser.website ? loggedUser.website : ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {loggedUser.website ? (
                        loggedUser.website
                      ) : (
                        <span className="text-gray-500">Add Website</span>
                      )}
                    </a>
                  </span>
                </span>
                <span className="flex mr-2 mt-2 ">
                  <FaCalendarAlt />
                  <span className="leading-5 ml-2 text-slate-300">
                    {moment(loggedUser && loggedUser.date).format(
                      "MMMM Do, YYYY"
                    )}
                  </span>
                </span>
              </div>
            </div>
            {/* TODO: Follower and Following functionality will be implement */}
            <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
              <div className="text-center pr-3">
                <span className="font-bold text-white">520</span>
                <span className="text-gray-600"> Following</span>
              </div>
              <div className="text-center px-3">
                <span className="font-bold text-white">2.4m </span>
                <span className="text-gray-600"> Followers</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-blue-600 border-1" />
        <div></div>
        {!isLoading ? (
          <>
            {myPost.map((post: Post) => (
              <div key={post._id} className="">
                <div className=" flex items-center justify-between p-4 pb-0 relative">
                  <div className="flex items-center">
                    <div>
                      <Image
                        width={100}
                        height={100}
                        className="h-10 w-10 rounded-full"
                        src={post?.user_photo || avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center gap-1">
                        <p className="text-base leading-6 font-medium text-white">
                          {post?.name}
                        </p>
                        {loggedUser && loggedUser.photo && (
                          <Image
                            width={100}
                            height={100}
                            className="h-3.5 w-3.5 rounded-full"
                            src={verified}
                            alt="verified"
                            title="NH Social confirmed this profile is authentic"
                          />
                        )}
                      </div>
                      <span className="text-sm leading-6 ms-1 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        {post?.user_name} -{" "}
                        {moment(post?.date).format("Do MMM  YY, h:mm a")}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => handleEditClick(post._id)}
                    className="font-semibold text-xl hover:cursor-pointer hover:text-blue-400"
                  >
                    ...
                  </div>
                  <EditPost
                    editModes={editModes[post._id] || false}
                    setEditModes={(postId) => handleEditClick(postId)}
                    post={post}
                    refetch={refetch}
                  />
                </div>
                <div className="pl-16 pr-2">
                  <p
                    className="text-base width-auto font-medium text-white flex-shrink"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {post?.post_text}
                  </p>
                  {post.post_photo && (
                    <div className="md:flex-shrink pr-6 pt-3">
                      <Zoom>
                        <Image
                          height={1000}
                          width={1000}
                          className="rounded-lg h-full w-full"
                          src={post?.post_photo}
                          alt="Photo is brocken"
                        />
                      </Zoom>
                    </div>
                  )}
                  <Like post={post} />
                </div>
                <hr className="border-gray-600" />
              </div>
            ))}

            <nav className="lg:hidden fixed z-[999] flex justify-between items-center gap-5 bg-blue-400 px-6 py-3 backdrop-blur-md w-full rounded-full text-dark_primary duration-300 bottom-0">
              <Link
                href="/"
                className="text-xl p-2.5 rounded-full sm:cursor-pointer"
              >
                <FaHome />
              </Link>
              <Link
                href="/"
                className="text-xl p-2.5 rounded-full sm:cursor-pointer"
              >
                <FaRegBell />
              </Link>
              <Link
                href="/"
                className="text-xl p-2.5 rounded-full sm:cursor-pointer"
              >
                <FaFacebookMessenger />
              </Link>

              <div className="dropdown dropdown-top">
                <div className="flex items-center">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <Image
                        width={100}
                        height={100}
                        src={loggedUser?.photo ? loggedUser?.photo : avatar}
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800 text-white"
                >
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
            </nav>
          </>
        ) : (
          // Loading Skeleton
          <>
            <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
              <div className="flex justify-start items-center">
                <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
                <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
              </div>
              <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
            </div>
            <hr className="border-gray-600" />
            <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
              <div className="flex justify-start items-center">
                <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
                <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
              </div>
              <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
            </div>
            <hr className="border-gray-600" />
            <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
              <div className="flex justify-start items-center">
                <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
                <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
              </div>
              <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
            </div>
            <hr className="border-gray-600" />
            <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
              <div className="flex justify-start items-center">
                <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
                <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
                <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
              </div>
              <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
            </div>
            <hr className="border-gray-600" />
          </>
        )}
      </div>
      <nav className="lg:hidden fixed z-[999] flex justify-between items-center gap-5 bg-blue-400 px-6 py-3 backdrop-blur-md w-full rounded-full text-dark_primary duration-300 bottom-0">
        <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
          <FaHome />
        </Link>
        <Link
          href="/notification"
          className="text-xl p-2.5 rounded-full sm:cursor-pointer"
        >
          <FaRegBell />
        </Link>
        <Link
          href="/message"
          className="text-xl p-2.5 rounded-full sm:cursor-pointer"
        >
          <FaFacebookMessenger />
        </Link>
        <div className="dropdown dropdown-top">
          <div className="flex items-center">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <Image
                  width={100}
                  height={100}
                  src={loggedUser?.photo ? loggedUser?.photo : avatar}
                  alt=""
                />
              </div>
            </label>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800 text-white"
          >
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
      </nav>
    </div>
  );
};

export default ProfilePage;
