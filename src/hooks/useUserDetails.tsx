"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserDetails = (email: string) => {
  const {
    data: userProfile = {},
    isLoading: isUserProfileLoading,
    refetch: userProfileRefetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get(
        `https://nh-social-server.vercel.app/user-profile/${email}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      console.log(response.data);
      return response.data;
    },
  });

  return [userProfile, isUserProfileLoading, userProfileRefetch];
};

export default useUserDetails;
