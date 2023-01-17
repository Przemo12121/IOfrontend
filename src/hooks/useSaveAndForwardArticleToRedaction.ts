import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { ArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useSaveAndFrowardArticleToRedaction = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['redaction'], (data: { formData: ArticleDto & { id: number } } & { type: 'submit' | 'publish' }) => BackendApi.saveAndForwardArticleToRedaction(data.formData, data.type), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      toast.success('Szkic artykułu został przekazany do redaktora')

      navigate('/', { replace: true })
    }
  })

  return mutation
}

export default useSaveAndFrowardArticleToRedaction