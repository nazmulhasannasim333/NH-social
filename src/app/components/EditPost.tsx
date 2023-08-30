import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Post } from "./MiddlePost/page";

interface EditPostProps {
  editModes: boolean;
  post: Post;
  refetch: () => void;
  setEditModes: (postId: string) => void; // Add this line
}

const EditPost: React.FC<EditPostProps> = ({
  editModes,
  setEditModes,
  post,
  refetch,
}) => {
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
            `https://nh-social-server.vercel.app/remove_post/${selectedPost._id}`
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

  // Edit a post

  return (
    <>
      {editModes && (
        <div className="bg-slate-800 p-3 absolute right-10 top-12">
          <ul>
            <li className="flex items-center hover:cursor-pointer">
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
          </ul>
        </div>
      )}
    </>
  );
};

export default EditPost;
