"use client";
import usePosts from "@/src/hooks/usePosts";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import Swal from "sweetalert2";
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
type FormData = {
  tweetText: string;
  photo: string;
};

const MiddlePost = () => {
  const [posts, refetch] = usePosts();
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  // console.log(image_upload_token);

  // add emoji
  const addEmoji = (e: { unified: string }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt("0x" + el, 16)));
    let emoji = String.fromCodePoint(...codeArray);
    setInputValue(inputValue + emoji);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data.photo.length);
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
              name: "MD Nasim Hosen",
              user_name: "@NHnasim333",
              user_email: "nasim123@gmail.com",
              user_photo:
                "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              // post_photo:
              // "https://images.pexels.com/photos/2315313/pexels-photo-2315313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            };

            axios.post(`http://localhost:5000/post`, status).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                reset();
                refetch();
                setInputValue("");
                setShowEmoji(!showEmoji);
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
      axios.post(`http://localhost:5000/post`, status).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          reset();
          refetch();
          setInputValue("");
          setShowEmoji(!showEmoji);
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
    <div className="col-span-4 border border-gray-600 h-auto border-t-0">
      {/*middle wall*/}
      <div className="flex sticky top-0 z-50 bg-gray-900">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">Home</h2>
        </div>
        <div className="flex-1 px-4 py-2 m-2">
          <span className=" text-2xl font-medium rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right">
            <svg
              className="m-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" />
              </g>
            </svg>
          </span>
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
                className="bg-blue-200 mt-2  text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
              >
                Post
              </button>
            ) : (
              <button className="bg-blue-400 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                Post
              </button>
            )}
          </div>
        </div>
      </form>
      <hr className="border-blue-800 border-4" />
      <div></div>
      {posts.map((post: Post) => (
        <div key={post._id}>
          <div className="flex flex-shrink-0 p-4 pb-0">
            <a href="#" className="flex-shrink-0 group block">
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
                    <span className="text-sm leading-6 ms-1 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      {post?.user_name} - 16 April 2023
                    </span>
                  </p>
                </div>
              </div>
            </a>
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
            <Like post={post} refetch={refetch} />
          </div>
          <hr className="border-gray-600" />
        </div>
      ))}
    </div>
  );
};

export default MiddlePost;
