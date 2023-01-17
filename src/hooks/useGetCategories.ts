import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

export const useGetCategories = () => {
  const query = useQuery(['getCategories'], () => BackendApi.getCategories())

  return query
}

export default useGetCategories