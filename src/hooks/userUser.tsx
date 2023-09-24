"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useUser = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: loggedUser = {},
    isLoading: isUserLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["loggedUser", user],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${user?.email}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    },
  });

  return [loggedUser, isUserLoading, userRefetch];
};

export default useUser;
