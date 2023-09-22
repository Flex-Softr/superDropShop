import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetRequest = (queryKey, endPoint) => {
  const [axiosSecure] = useAxiosSecure();
  const api = `/api/${endPoint}`;
  const { data = {}, isLoading,refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(api);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, isLoading, refetch };
};

export default useGetRequest;