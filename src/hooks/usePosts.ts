"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = (searchText: string) => {
  console.log(searchText);
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", searchText],
    queryFn: async () => {
      const response = await axios(
        `http://localhost:5000/posts?text=${searchText}`
      );
      return response.data;
    },
  });

  return [posts, isLoading, refetch];
};

export default usePosts;
