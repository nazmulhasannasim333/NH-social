"use client";
import usePosts from "@/src/hooks/usePosts";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import {
  FaFacebookMessenger,
  FaHome,
  FaPhotoVideo,
  FaRegBell,
  FaUserCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";
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
}
interface EditPostProps {
  showEdit: boolean;
  post: Post;
}
type FormData = {
  tweetText: string;
  photo: string;
};

const MiddlePost = () => {
  const [posts, isLoading, refetch] = usePosts();
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [editModes, setEditModes] = useState<{ [postId: string]: boolean }>({});

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
    // console.log(data.photo.length);
    if (data.photo.length > 0) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      fetch(image_upload_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((phostPhoto) => {
          if (phostPhoto.success) {
            const profileURL = phostPhoto.data.display_url;
            const { tweetText: post_text, photo: post_photo } = data;
            const status = {
              post_text,
              post_photo: profileURL,
              name: "MD Arman Hosen",
              user_name: "@NHnasim333",
              user_email: "nasim123@gmail.com",
              user_photo:
                "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            };

            axios
              .post(
                `https://nh-social-server-nazmulhasannasim333.vercel.app/post`,
                status
              )
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
        });
    } else {
      const { tweetText: post_text } = data;
      const status = {
        post_text,
        name: "MD Nasim Hosen",
        user_name: "@NHnasim333",
        user_email: "nasim123@gmail.com",
        user_photo:
          "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      };
      axios
        .post(
          `https://nh-social-server-nazmulhasannasim333.vercel.app/post`,
          status
        )
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
  };

  return (
    <div className="lg:col-span-4 border border-gray-600 h-auto border-t-0">
      {/*middle wall*/}
      <div className="flex sticky top-0 z-50 bg-gray-900 shadow-xl">
        <div className="w-1/3 m-2">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">
            <Link href="/">Home</Link>
          </h2>
        </div>
        <div className="w-2/3 px-4 py-2 m-2">
          <button type="submit" className="absolute ml-4 mt-3 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              // style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
          <input
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
              height={50}
              width={50}
              className="inline-block rounded-full"
              src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
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
              <div className="ms-5 text-center py-2 m-2 relative">
                <span className="mt-1 text-blue-400 hover:cursor-pointer">
                  <FaPhotoVideo type="file" className="text-2xl" />
                  <input
                    {...register("photo")}
                    type="file"
                    className="h-4 w-4 z-10 border-2 blue-600 border-blue-400 absolute right-1 bottom-3"
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
              <div className="absolute">
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
                      width={50}
                      height={50}
                      className="h-10 w-10 rounded-full"
                      src={post?.user_photo}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base leading-6 font-medium text-white">
                      {post?.name}
                    </p>
                    <span className="text-sm leading-6 ms-1 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      {post?.user_name} - 16 April 2023
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
                <p className="text-base width-auto font-medium text-white flex-shrink">
                  {post?.post_text}
                </p>
                {post.post_photo && (
                  <div className="md:flex-shrink pr-6 pt-3">
                    <Image
                      height={1000}
                      width={1000}
                      className="rounded-lg h-full w-full"
                      src={post?.post_photo}
                      alt="Photo is brocken"
                    />
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
            <Link
              href="/profile"
              className="text-xl p-2.5 rounded-full sm:cursor-pointer"
            >
              <FaUserCheck />
            </Link>
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
  );
};

export default MiddlePost;
