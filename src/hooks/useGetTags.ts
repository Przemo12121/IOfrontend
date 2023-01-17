import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

export const useGetTags = () => {
  const query = useQuery(['getTags'], () => BackendApi.getTags())

  return query
}

export default useGetTags