"use client";
import { RootState } from "@/src/redux/store";
import classNames from "@/src/utils/className";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
interface NavLinkProps {
  children: ReactNode;
  href: string;
  activeClassName?: string;
  className?: string;
  exact?: boolean;
}

const NavLink = ({
  children,
  href,
  activeClassName = "",
  exact = false,
  ...props
}: NavLinkProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const path = usePathname();
  const active = exact ? path === href : path && path.startsWith(href);
  const classes = classNames(
    props.className ?? "",
    active ? activeClassName : ""
  );
  if (classes) {
    props.className = classes;
  }
  return (
    <Link
      href={user ? href : "/login"}
      className={`mt-3 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300 hover:cursor-pointer ${classes}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
