"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
interface NavLinkProps {
  children: ReactNode;
  href: string;
  activeClassName: string;
}

const NavLink = ({
  children,
  href,
  activeClassName,
  ...props
}: NavLinkProps) => {
  const path = usePathname();
  return (
    <div className="mt-3 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300">
      {children}
    </div>
  );
};

export default NavLink;
