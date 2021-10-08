import { useLocation } from "react-router";
import qs from 'query-string'
export const useQuery = () => {
  const location = useLocation();
  const parsed = qs.parse(location.search)
  return parsed
}