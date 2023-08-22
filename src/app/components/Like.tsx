import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";

interface LikeProps {
  post: {
    _id: string;
    name: string;
    user_email: string;
  };
  refetch: () => void;
}

const Like: React.FC<LikeProps> = ({ post, refetch }) => {
  const [showLike, setShowLike] = useState(true);
  const [totalLikes, setTotalLikes] = useState(null);
  console.log(totalLikes);

  const handleLike = (id: string) => {
    const postLike = {
      postId: id,
      user_email: post.user_email,
      name: post.name,
    };
    axios.post("http://localhost:5000/like", postLike).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        setShowLike(false);
      }
      axios.get(`http://localhost:5000/likes/${post?._id}`).then((response) => {
        setTotalLikes(response.data.totalLikes);
        refetch(); // Optionally, refetch other data if needed
      });
    });
  };

  const handleUnlike = (id: string) => {
    axios.delete(`http://localhost:5000/unlike/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        setShowLike(true);
      }
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/likes/${post?._id}`).then((response) => {
      setTotalLikes(response.data.totalLikes);
      refetch();
    });
  }, [post._id, refetch]);

  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex items-center justify-between py-5">
          <div className=" text-center">
            <span className=" flex items-center justify-evenly rounded-full  text-slate-400 hover:text-blue-300 hover:cursor-pointer">
              <FaRegCommentDots className="text-xl me-2" />
              <span>45</span>
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
              {showLike ? (
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
            <a
              href="#"
              className="flex items-center justify-evenly rounded-full text-slate-400 hover:text-blue-300 hover:cursor-pointer"
            >
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Like;
