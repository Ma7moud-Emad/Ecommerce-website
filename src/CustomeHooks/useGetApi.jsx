// useGetApiQuery >> custom hook >> useQuery >> handle state mangement
// params >> <obj> { url >> get api , uniqueKey >> store cache memory}
// return >> result <obj>

import axios from "axios";
import { useQuery } from "react-query";

function useGetApiQuery({ url, uniqueKey }) {
  function callAPI() {
    return axios.get(url);
  }
  const result = useQuery({
    queryKey: uniqueKey,
    queryFn: callAPI,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return result;
}

export default useGetApiQuery;
