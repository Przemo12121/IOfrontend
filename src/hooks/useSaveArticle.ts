import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { PartialArticleDto } from './types';
import { toast } from 'react-hot-toast';

export const useSaveArticle = () => {
  const client = useQueryClient()

  const mutation = useMutation(['saveArticle'], (formData: PartialArticleDto & { id: number }) => BackendApi.saveArticle(formData), {
    onSuccess: (response ) => {
      client.invalidateQueries(['getArticles'])

      if (response.includes('success')) {
        toast.success(response)
      }
      else {
        toast.error(response)
      }
    }
  })


  return mutation
}

export default useSaveArticle