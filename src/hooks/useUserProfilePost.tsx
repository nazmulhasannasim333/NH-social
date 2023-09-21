"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserProfilePost = (email: string) => {
  const {
    data: userProfilePost = [],
    isLoading: isUserProfilePostLoading,
    refetch: userProfilePostRefetch,
  } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const response = await axios.get(
        `https://nh-social-server.vercel.app/user-profile-post/${email}`
      );
      // console.log(response.data);
      return response.data;
    },
  });

  return [userProfilePost, isUserProfilePostLoading, userProfilePostRefetch];
};

export default useUserProfilePost;
