import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ArticleDto, PartialArticleDto, CredentialsDto, TokenDto } from './types';
import { CategoryDto } from '../types';
import { getUser } from './store';
import logoutAction from './useLogout';
import { toast } from 'react-hot-toast';

const auth = {
  userId: '12345678-abcd-1234-abcd-123456abcdef'
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
})

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    // logoutAction('Coś poszło nie tak. Nastąpiło automatyczne wylogowanie')
    throw error
  }
)

axiosRetry(axiosInstance, { retries: 3, retryDelay: (retryCount, error) => 100 })

export namespace BackendApi {
  export function login(credentials: CredentialsDto): Promise<TokenDto> {
    return axiosInstance.post(`/auth/login`, credentials)
  } 

  export async function getArticle(id: number, forRedacting: boolean): Promise<any> {
    const data = await axiosInstance.get(`/blogs/my/${auth.userId}`, {
    }) as (PartialArticleDto & { id: number })[]

    return data[id]
      ? {
        id: data[id].id,
        title: data[id].title,
        text: (data[id] as any).content
      } : null
  }
  
  export function getCategories(): Promise<CategoryDto[]> {
    return axiosInstance.get('/categories', {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
  
  export function getTags(): Promise<{ name: string }[]> {
    return axiosInstance.get('/tags', {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function deleteArticle(id: number): Promise<string> {
    return axiosInstance.delete(`/blogs`, {
      data: { ...auth, blogId: id }
    })
  }

  export function addArticle(formData: PartialArticleDto): Promise<string> {
    return axiosInstance.post('/blogs', { ...formData, ...auth })
  }
  
  export function saveArticle(formData: PartialArticleDto & { id: number }): Promise<string> {
    return axiosInstance.patch(`/blogs/`, {
      blogId: formData.id,
      title: formData.title,
      text: formData.text,
      ...auth
    })
  }
  
  export function rollbackArticle(id: number): Promise<void> {
    return axiosInstance.get(`/articles/${id}/rollback`, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function saveAndForwardArticleToRedaction(formData: ArticleDto, type: 'submit' | 'publish'): Promise<void> {
    return axiosInstance.put(`/articles/${type}`, formData, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
}