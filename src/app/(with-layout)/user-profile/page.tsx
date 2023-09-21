import Link from "next/link";
import { ReactNode } from "react";

interface UserProfileProps {
  children: ReactNode;
  href: string;
}

const UserProfileLink = ({ href, children }: UserProfileProps) => {
  console.log(href);
  return <Link href={href}>{children}</Link>;
};

export default UserProfileLink;
