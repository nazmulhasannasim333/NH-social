import useUser from "@/src/hooks/userUser";
import { RootState } from "@/src/redux/store";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatar from "../../../public/images/avatar.png";
const image_upload_token = process.env.NEXT_PUBLIC_image_upload_token;

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type FormData = {
  name: string;
  email: string;
  user_name: string;
  phone: string;
  gender: string;
  website: string;
  address: string;
  university: string;
  about: string;
  photo: string;
};

interface User {
  name: string;
  email: string;
  photo: string;
  user_name: string;
  phone: string;
  gender: string;
  website: string;
  address: string;
  university: string;
  about: string;
}

const ProfileUpdateModal: React.FC<ProfileModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputImage, setInputImage] = useState<File | string>("");
  const [loggedUser, isUserLoading, userRefetch] = useUser();
  const router = useRouter();
  // console.log(loggedUser);

  // user profile image host in imgbb
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  // close modal
  const closeModal = () => {
    setIsOpen(false);
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
    if (inputImage) {
      const formData = new FormData();
      formData.append("image", inputImage);
      fetch(image_upload_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((userPhoto) => {
          if (userPhoto.success) {
            const userPhotoURL = userPhoto.data.display_url;
            const {
              name,
              email,
              user_name,
              phone,
              gender,
              website,
              address,
              university,
              about,
              photo,
            } = data;
            const updatedUser = {
              name,
              email,
              user_name,
              phone,
              gender,
              website,
              address,
              university,
              about,
              photo: userPhotoURL,
            };
            // console.log(user);
            axios
              .put(
                `http://localhost:5000/updateProfile/${user?.email}`,
                updatedUser
              )
              .then((res) => {
                console.log(res.data);
                if ((res.status = 200)) {
                  userRefetch();
                  closeModal();
                  router.push("/profile");
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your profile has been updated",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          }
        });
    } else {
      const {
        name,
        email,
        user_name,
        phone,
        gender,
        website,
        address,
        university,
        about,
      } = data;
      const updatedUser = {
        name,
        email,
        user_name,
        phone,
        gender,
        website,
        address,
        university,
        about,
      };
      axios
        .put(`http://localhost:5000/updateProfile/${user?.email}`, updatedUser)
        .then((res) => {
          console.log(res.status);
          if ((res.status = 200)) {
            userRefetch();
            closeModal();
            router.push("/profile");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your profile has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-slate-100"
                  >
                    <div className="flex justify-between items-center">
                      <h2>Update your profile</h2>
                      <FaRegWindowClose
                        onClick={closeModal}
                        className="hover:cursor-pointer hover:text-blue-600"
                      />
                    </div>
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center my-2">
                      <Image
                        width={100}
                        height={100}
                        onClick={handleImageClick}
                        className="h-24 w-24 rounded-full hover:opacity-50"
                        src={
                          inputImage
                            ? URL.createObjectURL(inputImage as File)
                            : loggedUser?.photo
                            ? loggedUser?.photo
                            : avatar
                        }
                        alt="profile"
                        title="Select profile picture"
                      />
                      <input
                        ref={inputRef}
                        onChange={handleImageChange}
                        type="file"
                        className="h-4 w-4 z-10 border-2 blue-600 border-blue-400 hidden"
                      />
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Name
                        </label>
                        <input
                          {...register("name")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Name"
                          defaultValue={loggedUser?.name && loggedUser?.name}
                          required
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Email
                        </label>
                        <input
                          {...register("email")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Email"
                          defaultValue={loggedUser?.email && loggedUser?.email}
                          required
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Username
                        </label>
                        <input
                          {...register("user_name")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Username"
                          defaultValue={
                            loggedUser?.user_name && loggedUser?.user_name
                          }
                          required
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="number"
                          placeholder="Your Phone Number"
                          defaultValue={loggedUser?.phone && loggedUser?.phone}
                          required
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Gender
                        </label>
                        <select
                          className=" bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          {...register("gender")}
                          defaultValue={
                            loggedUser?.gender && loggedUser?.gender
                          }
                          required
                        >
                          <option className="bg-slate-600" value="Male">
                            Male
                          </option>
                          <option className="bg-slate-600" value="Female">
                            Female
                          </option>
                          <option className="bg-slate-600" value="Custom">
                            Custom
                          </option>
                        </select>
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Website
                        </label>
                        <input
                          {...register("website")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Website"
                          defaultValue={
                            loggedUser?.website && loggedUser?.website
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Address
                        </label>
                        <input
                          {...register("address")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Address"
                          defaultValue={
                            loggedUser?.address && loggedUser?.address
                          }
                          required
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your University
                        </label>
                        <input
                          {...register("university")}
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your University"
                          defaultValue={
                            loggedUser?.university && loggedUser?.university
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className=" px-2 pt-2 mt-2">
                      <label className="text-slate-50" htmlFor="text">
                        About Yourself
                      </label>
                      <textarea
                        {...register("about")}
                        className="bg-transparent text-gray-200 mt-1 font-medium text-lg w-full outline-none border border-gray-600"
                        rows={4}
                        cols={50}
                        placeholder="About Yourself"
                        defaultValue={loggedUser?.about && loggedUser?.about}
                        required
                      />
                    </div>
                    <div className="flex">
                      <div className="w-10" />
                      <div className="flex-1">
                        <button
                          type="submit"
                          className="bg-blue-600 mt-2 mb-7 text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
                        >
                          Update Profile
                        </button>
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

export default ProfileUpdateModal;
