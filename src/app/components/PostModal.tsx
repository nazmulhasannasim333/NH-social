import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Post } from "./MiddlePost/page";

interface PostModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: Post;
  setEditModes: (postId: string) => void;
  refetch: () => void;
}
type FormData = {
  tweetText: string;
  photo: string;
};

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  setIsOpen,
  post,
  setEditModes,
  refetch,
}) => {
  const [inputValue, setInputValue] = useState("");
  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(post);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { tweetText: post_text } = data;
    const status = {
      post_text,
    };
    axios
      .put(
        `https://nh-social-server.vercel.app/update_post/${post._id}`,
        status
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          setIsOpen(false);
          setEditModes(post._id);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your post has been Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-100"
                  >
                    Edit your post
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                      <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea
                          {...register("tweetText")}
                          className=" bg-transparent text-gray-200 font-medium text-lg w-full outline-none"
                          rows={4}
                          cols={50}
                          placeholder="What's happening?"
                          defaultValue={post?.post_text}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>
                    </div>
                    {/*middle creat tweet below icons*/}
                    <div className="flex">
                      <div className="w-10" />
                      <div className="flex-1">
                        {inputValue.trim() === "" ? (
                          <button
                            disabled
                            className="bg-blue-200 mt-2 hover:cursor-not-allowed text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
                          >
                            Update Post
                          </button>
                        ) : (
                          <button className="bg-blue-400 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right hover:cursor-pointer">
                            Update Post
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default PostModal;
