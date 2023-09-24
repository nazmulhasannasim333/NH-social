"use client";

import { RootState } from "@/src/redux/store";
import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Post } from "./MiddlePost/page";
import PostModal from "./PostModal";

interface EditPostProps {
  editModes: boolean;
  post: Post;
  refetch: () => void;
  setEditModes: (postId: string) => void;
}

const EditPost: React.FC<EditPostProps> = ({
  editModes,
  setEditModes,
  post,
  refetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  // delete a post
  const handleDelete = (selectedPost: Post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wont to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:5000/remove_post/${selectedPost._id}/${user?.email}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setEditModes(post._id);
              refetch();
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      {editModes && (
        <>
          {post?.user_email === user?.email && (
            <div className="bg-slate-800 p-3 absolute right-10 top-12 z-50">
              <ul>
                <li
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center hover:cursor-pointer"
                >
                  <FaEdit />
                  <span className="ms-2">Edit Post</span>
                </li>
                <li
                  onClick={() => handleDelete(post)}
                  className="flex items-center mt-2 hover:cursor-pointer"
                >
                  <FaTrash />
                  <span className="ms-2">Delete Post</span>
                </li>
                <PostModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  post={post}
                  refetch={refetch}
                  setEditModes={setEditModes}
                />
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditPost;
