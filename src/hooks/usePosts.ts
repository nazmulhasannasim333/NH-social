"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePosts = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosSecure(`/posts`);
      return response.data;
    },
  });

  return [posts, isLoading, refetch];
};

export default usePosts;
