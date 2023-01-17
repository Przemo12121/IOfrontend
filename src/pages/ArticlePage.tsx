import { useSearchParams } from 'react-router-dom'
import useGetArticle from '../hooks/useGetArticle'
import LoadingPage from "./LoadingPage"
import { ArticlePageView } from "./ArticlePageView"
import { Roles, getUser } from '../hooks/store'
import useGetTags from '../hooks/useGetTags'
import useGetCategories from '../hooks/useGetCategories'


export const ArticlePage = () => {
  const [params, _] = useSearchParams()
  const articleId = params.get('id') ? Number.parseInt(params.get('id')!) : null
  const isRedactor = getUser()?.role === Roles.REDAKTOR
  const getArticle = useGetArticle({ enabled: articleId != null, id: articleId!, forRedacting: isRedactor})
  // const tags = useGetTags()
  
  if (getArticle.isLoading) {
    return <LoadingPage/>
  }

  return (
    <ArticlePageView
      isRedactor={isRedactor} 
      article={articleId != null && getArticle.isFetched ? getArticle.data : undefined}
    />
  )
}