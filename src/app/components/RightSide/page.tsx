import Image from "next/image";

const RightSide = () => {
  const CustomDate: Date = new Date();

  return (
    <div className="col-span-2 h-screen sticky top-0">
      {/*right menu*/}
      <div className="text-gray-300 max-w-sm py-5 ms-4 pb-0">
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
          placeholder="Search Twitter"
          className="bg-gray-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0"
        />
      </div>
      <div></div>
      {/*second-trending tweet section*/}
      <div className="max-w-sm rounded-lg bg-gray-700 overflow-hidden shadow-lg my-4 ms-4">
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
              Germany trends
            </h2>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*first trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              1 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">
              #Microsoft363
            </h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,466 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*second trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              2 . Politics . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#HI-Fashion</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              8,464 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*third trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              3 . Rock . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#Ferrari</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,586 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*forth trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              4 . Auto Racing . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#vettel</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              9,416 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*show more*/}
        <div className="flex">
          <div className="flex-1 p-4">
            <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">
              Show more
            </h2>
          </div>
        </div>
      </div>
      {/*third-people suggetion to follow section*/}
      <div className="max-w-sm rounded-lg bg-gray-700 overflow-hidden shadow-lg ms-4">
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
              Who to follow
            </h2>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*first person who to follow*/}
        <div className="flex flex-shrink-0">
          <div className="flex-1 ">
            <div className="flex items-center w-48">
              <div>
                <Image
                  width={50}
                  height={50}
                  className="inline-block rounded-full ml-4 mt-2"
                  src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                  alt=""
                />
              </div>
              <div className="ml-3 mt-3">
                <p className="text-base leading-6 font-medium text-white">
                  Sonali Hirave
                </p>
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @ShonaDesign
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a href="" className=" float-right">
              <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                Follow
              </button>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*second person who to follow*/}
        <div className="flex flex-shrink-0">
          <div className="flex-1 ">
            <div className="flex items-center w-48">
              <div>
                <Image
                  width={50}
                  height={50}
                  className="inline-block  rounded-full ml-4 mt-2"
                  src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                  alt=""
                />
              </div>
              <div className="ml-3 mt-3">
                <p className="text-base leading-6 font-medium text-white">
                  Sonali Hirave
                </p>
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @ShonaDesign
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a href="" className=" float-right">
              <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                Follow
              </button>
            </a>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*show more*/}
        <div className="flex">
          <div className="flex-1 p-4">
            <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">
              Show more
            </h2>
          </div>
        </div>
      </div>
      <div className="ms-6 my-6">
        <div className="flex-1">
          <a href="#">
            <p className="text-sm leading-6 font-medium text-gray-500">
              Terms Privacy Policy Cookies Imprint Ads info
            </p>
          </a>
        </div>
        <div className="flex-2">
          <p className="text-sm leading-6 font-medium text-gray-600">
            {" "}
            &copy; {CustomDate.getFullYear()} Twitter, Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
