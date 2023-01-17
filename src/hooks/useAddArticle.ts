import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { PartialArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAddArticle = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['addArticle'], (formData: PartialArticleDto) => BackendApi.addArticle(formData), {
    onSuccess: (response) => {
      client.invalidateQueries(['getArticles'])

      if (response.includes('success')) {
        toast.success(response)
      }
      else {
        toast.error(response)
      }

      navigate(`/articles/manage`, { replace: true })
    },
  })

  return mutation
}

export default useAddArticle