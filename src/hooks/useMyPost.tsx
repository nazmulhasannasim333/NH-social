"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useMyPosts = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: myPost = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const response = await axios(
        `https://nh-social-server.vercel.app/my_post/${user?.email}`
      );
      console.log(response.data);
      return response.data;
    },
  });

  return [myPost, isLoading, refetch];
};

export default useMyPosts;
