"use client";
import { logoutUser } from "@/src/firebase/firebaseAuth";
import usePosts from "@/src/hooks/usePosts";
import { RootState } from "@/src/redux/store";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import {
  FaFacebookMessenger,
  FaHome,
  FaRegBell,
  FaSearch,
} from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatar from "../../../../public/images/avatar.png";
import gallery from "../../../../public/images/gallery.png";
import verified from "../../../../public/images/verified.png";
import EditPost from "../EditPost";
import Like from "../Like";
declare global {
  interface ImportMeta {
    env: {
      NODE_ENV: "development" | "production" | "test";
    };
  }
}
const image_upload_token = process.env.NEXT_PUBLIC_image_upload_token;
export interface Post {
  _id: string;
  post_photo: string;
  user_photo: string;
  user_email: string;
  post_text: string;
  name: string;
  user_name: string;
  date: string;
}

type FormData = {
  tweetText: string;
  photo: string;
};

interface User {
  name: string;
  email: string;
  photo: string;
  user_name: string;
}

const MiddlePost = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, isLoading, refetch] = usePosts(searchText);
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [editModes, setEditModes] = useState<{ [postId: string]: boolean }>({});
  const { user } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputImage, setInputImage] = useState<File | string>("");
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  // console.log(searchText);

  // get post by search text
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setSearchText(e.target.value);
  };

  // get logged user
  useEffect(() => {
    axios
      .get(`https://nh-social-server.vercel.app/user/${user?.email}`)
      .then((res) => {
        setLoggedUser(res.data);
      });
  }, [user?.email]);

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

  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  // console.log(image_upload_token);

  // add emoji
  const addEmoji = (e: { native: string }) => {
    const emoji = e.native;
    setInputValue(inputValue + emoji);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (!user) {
      Swal.fire({
        title: "Please Login first then post something",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      if (inputImage) {
        const formData = new FormData();
        formData.append("image", inputImage);
        fetch(image_upload_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((phostPhoto) => {
            if (phostPhoto.success) {
              const postURL = phostPhoto.data.display_url;
              const { tweetText: post_text, photo: post_photo } = data;
              const status = {
                post_text,
                post_photo: postURL,
                name: loggedUser?.name,
                user_name: loggedUser?.user_name,
                user_email: loggedUser?.email,
                user_photo: loggedUser?.photo || "",
              };

              axios
                .post(`https://nh-social-server.vercel.app/post`, status)
                .then((res) => {
                  console.log(res.data);
                  if (res.data.insertedId) {
                    refetch();
                    setInputValue("");
                    setShowEmoji(false);
                    setInputImage("");
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your post has been successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
            }
          });
      } else {
        const { tweetText: post_text } = data;
        const status = {
          post_text,
          name: loggedUser?.name,
          user_name: loggedUser?.user_name,
          user_email: loggedUser?.email,
          user_photo: loggedUser?.photo || "",
        };
        axios
          .post(`https://nh-social-server.vercel.app/post`, status)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              refetch();
              setInputValue("");
              setShowEmoji(false);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your post has been success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    }
  };

  // post a image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    console.log(selectedImage);
    if (selectedImage) {
      setInputImage(selectedImage);
    }
  };

  // click on a image
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="lg:col-span-4 border border-gray-600 h-auto border-t-0">
      {/*middle wall*/}
      <div className="flex sticky top-0 z-50 bg-gray-900 shadow-xl">
        <div className="w-1/3 m-2">
          <h2 className="px-4 py-2 text-2xl font-bold text-white hidden lg:block">
            <Link href="/">Home</Link>
          </h2>
          <h2 className="ps-2 py-2 text-xl font-bold text-orange-500 lg:hidden block">
            <Link href="/">
              {" "}
              NH <span className="text-sky-400">Social</span>
            </Link>
          </h2>
        </div>
        <div className="w-2/3 px-4 py-2 m-2">
          <button type="submit" className="absolute ml-4 mt-3 mr-4">
            <FaSearch />
          </button>
          <input
            onChange={handleSearchText}
            type="search"
            name="search"
            placeholder="Search NH Social"
            className="bg-gray-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0"
          />
        </div>
      </div>
      <hr className="border-gray-600" />
      {/*middle creat tweet*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="m-2 w-10 py-1">
            <Image
              height={100}
              width={100}
              className="inline-block rounded-full h-10 w-10"
              src={loggedUser && loggedUser.photo ? loggedUser?.photo : avatar}
              alt=""
            />
          </div>
          <div className="flex-1 px-2 pt-2 mt-2">
            <textarea
              {...register("tweetText")}
              onFocus={() => setShowEmoji(false)}
              className=" bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
              rows={4}
              cols={50}
              placeholder="What's happening?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        {inputImage && (
          <div>
            <Image
              height={1000}
              width={1000}
              className="rounded-md h-24 w-28 ms-10"
              src={inputImage ? URL.createObjectURL(inputImage as File) : ""}
              alt="Photo is brocken"
            />
          </div>
        )}

        {/*middle creat tweet below icons*/}
        <div className="flex">
          <div className="w-10" />
          <div className="w-64 px-2">
            <div className="flex items-center">
              <div className="text-center py-2 m-2">
                <span className="mt-1 text-blue-400 hover:cursor-pointer">
                  <BsCameraVideo className="text-2xl" />
                </span>
              </div>
              <div
                onClick={handleImageClick}
                className="ms-5 text-center py-2 m-2 relative"
              >
                <span className="mt-1 text-blue-400 hover:cursor-pointer">
                  <Image
                    height={100}
                    width={100}
                    className="rounded-md h-6 w-6"
                    src={gallery}
                    alt="Photo is brocken"
                  />
                  <input
                    ref={inputRef}
                    onChange={handleImageChange}
                    type="file"
                    className="h-4 w-4 z-10 border-2 blue-600 border-blue-400 hidden"
                  />
                </span>
              </div>
              <div className="ms-5 text-center py-2 m-2">
                <span
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="mt-1 text-blue-400 hover:cursor-pointer"
                >
                  <BsEmojiLaughing className="text-2xl" />
                </span>
              </div>
            </div>
            {showEmoji && (
              <div className="absolute z-50">
                <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>
          <div className="flex-1">
            {inputValue.trim() === "" ? (
              <button
                disabled
                className="bg-blue-200 mt-2 hover:cursor-not-allowed text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
              >
                Post
              </button>
            ) : (
              <button className="bg-blue-400 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right hover:cursor-pointer">
                Post
              </button>
            )}
          </div>
        </div>
      </form>
      <hr className="border-blue-800 border-2" />
      <div></div>
      {!isLoading ? (
        <>
          {posts.map((post: Post, index: number) => (
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
                      {post?.user_photo && (
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
                    <span className="text-sm leading-6  font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
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
                  className="text-base width-auto font-medium text-slate-200 flex-shrink"
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
      <nav className="lg:hidden fixed z-[999] flex justify-between items-center gap-5 bg-blue-400 px-6 py-3 backdrop-blur-md w-full rounded-full text-dark_primary duration-300 bottom-0">
        <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
          <FaHome />
        </Link>
        <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
          <FaRegBell />
        </Link>
        <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
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
      </nav>
    </div>
  );
};

export default MiddlePost;
