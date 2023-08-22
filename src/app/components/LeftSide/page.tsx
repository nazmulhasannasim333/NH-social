import Image from "next/image";
import Navbar from "../Navbar";

const LeftSide = () => {
  return (
    <div className="col-span-2 flex flex-col justify-between h-screen text-white py-4 sticky top-0 overflow-hidden">
      {/*left menu*/}
      <div>
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12 text-white"
          fill="currentColor"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </g>
        </svg>
        <Navbar />
        <button className="bg-blue-400 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Tweet
        </button>
      </div>
      <div className="dropdown dropdown-top">
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width={50}
                height={50}
                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                alt=""
              />
            </div>
          </label>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              Md Nasim Hosen
            </p>
            <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              @NHnasim333
            </p>
          </div>
        </div>

        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800 text-white"
        >
          <li className="my-2">
            <a>Profile</a>
          </li>
          <li className="mb-2">
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
