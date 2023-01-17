import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { CredentialsDto, PartialArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
import { setUser } from './store';

export const useLogin = () => {
  const navigate = useNavigate()
  
  const mutation = useMutation(['login'], (data: CredentialsDto) => BackendApi.login(data), {
    onSuccess: (response) => {
      if (response.token) {
        const payload = jwt(response.token) as any

        setUser({
          email: payload.sub,
          role: payload.role,
          token: response.token
        })

        window.location.replace('http://localhost:3000/articles/manage')
        
        // navigate(`/articles/manage`, { replace: true })
      }
    }
  })

  return mutation
}

export default useLogin