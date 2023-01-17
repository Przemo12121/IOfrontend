import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

type Options = { 
  enabled: boolean
  id: number
  forRedacting: boolean
}

export const useGetArticle = (options: Options) => {
  const query = useQuery(['getArticle'], () => BackendApi.getArticle(options.id, options.forRedacting), {
    enabled: options.enabled
  })

  return query
}

export default useGetArticle