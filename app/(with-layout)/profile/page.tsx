import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "NH Social || Profile",
  description: "NH Social App",
};

const ProfilePage = () => {
  return (
    <div className="col-span-4 h-auto border border-y-0 border-gray-800">
      {/*Content (Center)*/}
      {/* Nav back*/}
      <div>
        <div className="flex justify-start">
          <div className="px-4 py-2 mx-2">
            <a
              href=""
              className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                </g>
              </svg>
            </a>
          </div>
          <div className="m-2">
            <h2 className="mb-0 text-xl font-bold text-white">
              MD Nasim Hosen
            </h2>
            <p className="mb-0 w-48 text-xs text-gray-400">9,416 Tweets</p>
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
      {/* User card*/}
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage:
              "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)",
          }}
        >
          <Image
            width={100}
            height={100}
            className="opacity-0 w-full h-full"
            src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* Avatar */}
            <div className="flex flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative avatar"
                >
                  <Image
                    width={100}
                    height={100}
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative border-4 border-gray-900"
                    src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                    alt=""
                  />
                  <div className="absolute" />
                </div>
              </div>
            </div>
            {/* Follow Button */}
            <div className="flex flex-col text-right">
              <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800  items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                Edit Profile
              </button>
            </div>
          </div>
          {/* Profile info */}
          <div className="space-y-1 justify-center w-full mt-3 ml-3">
            {/* User basic*/}
            <div>
              <h2 className="text-xl leading-6 font-bold text-white">
                Md Nasim Hosen
              </h2>
              <p className="text-sm leading-5 font-medium text-gray-600">
                @NHnasim333
              </p>
            </div>
            {/* Description and others */}
            <div className="mt-3">
              <p className="text-white leading-tight mb-2">
                Software Engineer / Designer / Entrepreneur <br />
                Visit my website to test a working <b>Twitter Clone.</b>{" "}
              </p>
              <div className="text-gray-600 flex">
                <span className="flex mr-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                    <g>
                      <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z" />
                      <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z" />
                    </g>
                  </svg>{" "}
                  <a
                    href="https://ricardoribeirodev.com/personal/"
                    target="#"
                    className="leading-5 ml-1 text-blue-400"
                  >
                    www.RicardoRibeiroDEV.com
                  </a>
                </span>
                <span className="flex mr-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                    <g>
                      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z" />
                      <circle cx="7.032" cy="8.75" r="1.285" />
                      <circle cx="7.032" cy="13.156" r="1.285" />
                      <circle cx="16.968" cy="8.75" r="1.285" />
                      <circle cx="16.968" cy="13.156" r="1.285" />
                      <circle cx={12} cy="8.75" r="1.285" />
                      <circle cx={12} cy="13.156" r="1.285" />
                      <circle cx="7.032" cy="17.486" r="1.285" />
                      <circle cx={12} cy="17.486" r="1.285" />
                    </g>
                  </svg>{" "}
                  <span className="leading-5 ml-1">Joined December, 2019</span>
                </span>
              </div>
            </div>
            <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
              <div className="text-center pr-3">
                <span className="font-bold text-white">520</span>
                <span className="text-gray-600"> Following</span>
              </div>
              <div className="text-center px-3">
                <span className="font-bold text-white">23,4m </span>
                <span className="text-gray-600"> Followers</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
    </div>
  );
};

export default ProfilePage;
