import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSide from "../components/LeftSide/page";
import RightSide from "../components/RightSide/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NH Social || Home",
  description: "NH Social App",
};

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-900 text-white min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-8">
              <LeftSide />
              {children}
              <RightSide />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default WithLayout;
