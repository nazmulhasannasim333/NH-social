import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProfileUpdateModal: React.FC<ProfileModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const closeModal = () => {
    setIsOpen(false);
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
                    Update your profile
                  </Dialog.Title>
                  <form
                  //    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex justify-center my-2">
                      <Image
                        width={100}
                        height={100}
                        className="h-20 w-20 rounded-full"
                        src="https://images.pexels.com/photos/18277249/pexels-photo-18277249/free-photo-of-man-people-art-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="profile"
                        title="NH Social confirmed this profile is authentic"
                      />
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Name
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Email
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Username
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Username"
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Phone Number
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Phone Number"
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Gender
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Gender"
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Website
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Website"
                        />
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your Address
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your Address"
                        />
                      </div>
                      <div className="lg:w-1/2 px-2 pt-2 mt-2">
                        <label className="text-slate-50" htmlFor="text">
                          Your University
                        </label>
                        <input
                          className="bg-transparent py-2 mt-1 text-gray-200 font-medium text-lg w-full outline-none border border-gray-600"
                          type="text"
                          placeholder="Your University"
                        />
                      </div>
                    </div>
                    <div className=" px-2 pt-2 mt-2">
                      <label className="text-slate-50" htmlFor="text">
                        About Yourself
                      </label>
                      <textarea
                        //   {...register("tweetText")}
                        className="bg-transparent text-gray-200 mt-1 font-medium text-lg w-full outline-none border border-gray-600"
                        rows={4}
                        cols={50}
                        placeholder="About Yourself"
                        //   defaultValue={post?.post_text}
                      />
                    </div>
                    {/*middle creat tweet below icons*/}
                    <div className="flex">
                      <div className="w-10" />
                      <div className="flex-1">
                        <button
                          disabled
                          className="bg-blue-200 mt-2 mb-7 hover:cursor-not-allowed text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
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
