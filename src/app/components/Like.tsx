import { RootState } from "@/src/redux/store";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsEmojiLaughing } from "react-icons/bs";
import {
  FaHeart,
  FaRegCommentDots,
  FaRegHeart,
  FaTelegram,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatar from "../../../public/images/avatar.png";

interface LikeProps {
  post: {
    _id: string;
    name: string;
    user_email: string;
  };
}
type FormData = {
  commentText: string;
};

type Comment = {
  _id: string;
  comment_text: string;
  user_photo: string;
  name: string;
  user_name: string;
  user_email: string;
};
interface User {
  name: string;
  email: string;
  photo: string;
  user_name: string;
}

const Like: React.FC<LikeProps> = ({ post }) => {
  const [showLike, setShowLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [totalLikes, setTotalLikes] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [totalComments, setTotalComments] = useState(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  // get logged user
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${user?.email}`).then((res) => {
      setLoggedUser(res.data);
    });
  }, [user?.email]);

  //  ---------------- ** Like Related Functionalities Start ** ------------------------
  // handle like function
  const handleLike = (id: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then like this post",
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
      const postLike = {
        postId: id,
        email: user?.email,
        name: user?.displayName,
      };
      axios.post("http://localhost:5000/like", postLike).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          setShowLike(true);
        }
        axios
          .get(`http://localhost:5000/likes/${post?._id}`)
          .then((response) => {
            setTotalLikes(response.data.totalLikes);
          });
      });
    }
  };

  // handle unlike function
  const handleUnlike = (id: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then unlike this post",
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
      axios
        .delete(`http://localhost:5000/unlike/${id}/${user?.email}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            setShowLike(false);
          }
          axios
            .get(`http://localhost:5000/likes/${post?._id}`)
            .then((response) => {
              setTotalLikes(response.data.totalLikes);
            });
        });
    }
  };

  // get post total likes
  useEffect(() => {
    axios.get(`http://localhost:5000/likes/${post?._id}`).then((response) => {
      setTotalLikes(response.data.totalLikes);
    });
  }, [post._id]);

  // Check if the post is liked by the user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userLiked/${user?.email}`)
      .then((response) => {
        const likedPosts = response.data.map((like: any) => like._id);
        setShowLike(likedPosts.includes(post._id));
      });
  }, [post._id, user?.email]);

  //  ---------------- ** Like Related Functionalities End ** ------------------------

  //  ---------------- ** Comment Related Functionalities Start ** -------------------
  // add emoji in comment box
  const addEmoji = (e: { native: string }) => {
    const emoji = e.native;
    setInputValue(inputValue + emoji);
  };

  // useFrom
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  // onsubmit a comment
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then comment in this post",
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
      const { commentText: comment_text } = data;
      const comment = {
        postId: post._id,
        comment_text,
        user_photo: loggedUser?.photo || "",
        name: loggedUser?.name,
        user_name: loggedUser?.user_name,
        email: loggedUser?.email,
      };
      console.log(comment);
      axios.post(`http://localhost:5000/comment`, comment).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          reset();
          setInputValue("");
          setShowEmoji(false);
          // get total comment number refetch
          axios
            .get(`http://localhost:5000/total_comments/${post?._id}`)
            .then((response) => {
              setTotalComments(response.data.totalComments);
            });
          // get comment refetch
          axios
            .get(`http://localhost:5000/comments/${post?._id}`)
            .then((response) => {
              setComments(response.data);
            });
        }
      });
    }
  };

  // get post total comment number
  useEffect(() => {
    axios
      .get(`http://localhost:5000/total_comments/${post?._id}`)
      .then((response) => {
        setTotalComments(response.data.totalComments);
      });
  }, [post._id]);

  // get total comment post wise
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${post?._id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, [post._id]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit({ commentText: inputValue });
    }
  };

  //  ---------------- ** Comment Related Functionalities End ** ---------------------

  return (
    <div className="flex">
      <div className="w-full ">
        <div className="flex items-center justify-between py-5">
          <div className=" text-center py-2 m-2">
            <span
              onClick={() => setShowComment(!showComment)}
              className=" flex items-center justify-evenly rounded-full  text-slate-400 hover:text-blue-300 hover:cursor-pointer"
            >
              <FaRegCommentDots className="text-xl me-2" />
              <span>{totalComments}</span>
            </span>
          </div>
          <div className=" text-center py-2 m-2">
            <span className="flex items-center justify-evenly rounded-full text-slate-400 hover:text-blue-300 hover:cursor-pointer">
              <svg
                className="text-center h-7 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </span>
          </div>
          <div className=" text-center py-2 m-2">
            <span className=" flex items-center justify-evenly rounded-full text-slate-400 hover:text-red-400 hover:cursor-pointer">
              {showLike === false ? (
                <div
                  onClick={() => handleLike(post._id)}
                  className="flex items-center"
                >
                  <FaRegHeart className="text-lg me-2" />
                  <span>{totalLikes && totalLikes}</span>
                </div>
              ) : (
                <div
                  onClick={() => handleUnlike(post._id)}
                  className="flex items-center"
                >
                  <FaHeart className="text-lg me-2 text-red-400" />
                  <span className="text-red-400">
                    {totalLikes && totalLikes}
                  </span>
                </div>
              )}
            </span>
          </div>
          <div className=" text-center py-2 m-2">
            <span className="flex items-center justify-evenly rounded-full text-slate-400 hover:text-blue-300 hover:cursor-pointer">
              <svg
                className="text-center h-7 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
          </div>
          <div className="text-center py-2 m-2">
            <span className="flex items-center justify-evenly rounded-full text-slate-400 hover:text-blue-300 hover:cursor-pointer">
              <svg
                className="text-center h-7 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </span>
          </div>
        </div>
        {showComment && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-2 my-3 bg-gray-800 w-full rounded-lg">
                <div className="flex">
                  <div className="m-2 w-10 py-1">
                    <Image
                      height={100}
                      width={100}
                      className="inline-block h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/17938786/pexels-photo-17938786/free-photo-of-man-standing-in-a-field-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 pt-2 mb-2">
                    <textarea
                      {...register("commentText")}
                      onFocus={() => setShowEmoji(false)}
                      rows={2}
                      cols={20}
                      className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
                      placeholder="Write a comment..."
                      value={inputValue}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <span
                      className="hover:cursor-pointer"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <BsEmojiLaughing className="text-xl" />
                    </span>
                  </div>
                  {showEmoji && (
                    <div className="absolute mt-24 ms-10">
                      <Picker
                        data={data}
                        emojiSize={20}
                        emojiButtonSize={28}
                        onEmojiSelect={addEmoji}
                        maxFrequentRows={0}
                      />
                    </div>
                  )}
                  {inputValue.trim() === "" ? (
                    <button
                      disabled
                      className=" font-bold mr-2 text-2xl hover:cursor-not-allowed"
                    >
                      <FaTelegram className="text-gray-500" />
                    </button>
                  ) : (
                    <button className="font-bold mr-2 text-2xl hover:cursor-pointer ">
                      <FaTelegram className="text-gray-100 hover:text-blue-500" />
                    </button>
                  )}
                </div>
              </div>
            </form>
            {comments?.map((user_comment) => (
              <div className="w-full" key={user_comment._id}>
                <div className="bg-slate-800 inline-block ps-2 py-2 mx-2 mb-3 rounded-lg pr-5">
                  <div className="flex">
                    <div>
                      <Image
                        height={100}
                        width={100}
                        className="inline-block h-8 w-8 rounded-full"
                        src={
                          user_comment?.user_photo
                            ? user_comment?.user_photo
                            : avatar
                        }
                        alt=""
                      />
                    </div>
                    <div className="ms-3">
                      <h1 className="text-lg font-semibold">
                        {user_comment?.name}
                      </h1>
                      <p className="text-slate-200">
                        {user_comment?.comment_text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Like;
