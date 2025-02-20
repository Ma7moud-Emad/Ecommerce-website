import axios from "axios";
import { useQuery } from "react-query";

function useCategories() {
  function callAPI() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const result = useQuery({
    queryKey: ["categories"],
    queryFn: callAPI,
  });

  return result;
}

export default useCategories;
