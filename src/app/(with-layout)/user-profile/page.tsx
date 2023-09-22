import Link from "next/link";
import React from "react";

interface UserProfileLinkProps {
  href: string;
  children: React.ReactNode;
}

const UserProfileLink: React.FC<UserProfileLinkProps> = ({
  href,
  children,
}) => {
  console.log(href, children);
  return <Link href={href}>{children}</Link>;
};

export default UserProfileLink;
