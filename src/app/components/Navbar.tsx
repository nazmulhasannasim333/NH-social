import { CgMoreO } from "react-icons/cg";
import {
  FaClipboardList,
  FaCommentDots,
  FaHashtag,
  FaHome,
  FaRegBell,
  FaRegBookmark,
  FaUserCheck,
} from "react-icons/fa";
import NavLink from "./NavLink";

const navLinks = [
  {
    path: "/",
    title: "Home",
    icon: <FaHome />,
  },
  {
    path: "/explore",
    title: "Explore",
    icon: <FaHashtag />,
  },
  {
    path: "/notification",
    title: "Notification",
    icon: <FaRegBell />,
  },
  {
    path: "/message",
    title: "Message",
    icon: <FaCommentDots />,
  },
  {
    path: "/bookmarks",
    title: "Bookmarks",
    icon: <FaRegBookmark />,
  },
  {
    path: "/lists",
    title: "Lists",
    icon: <FaClipboardList />,
  },
  {
    path: "/profile",
    title: "Profile",
    icon: <FaUserCheck />,
  },
  {
    path: "/more",
    title: "More",
    icon: <CgMoreO />,
  },
];

const Navbar = () => {
  return (
    <div>
      <nav className=" px-2">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            href={link.path}
            exact={link.path === "/"}
            activeClassName="bg-blue-800 hover:text-blue-300"
          >
            <div className="flex items-center">
              <p className="me-4 text-2xl">{link?.icon}</p>
              <p className="text-lg">{link?.title}</p>
            </div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
