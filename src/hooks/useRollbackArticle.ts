import { useMutation, useQueryClient, useQuery } from 'react-query';
import { BackendApi } from './BackendApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useRollbackArticle = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['rollbackArticle'], (id: number) => BackendApi.rollbackArticle(id), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      toast.success('Szkic artykułu został wycofany do autora')

      navigate('/', { replace: true })
    }
  })

  return mutation
}

export default useRollbackArticle