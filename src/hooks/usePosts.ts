"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = () => {
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios(`http://localhost:5000/posts`);
      return response.data;
    },
  });

  return [posts, isLoading, refetch];
};

export default usePosts;
