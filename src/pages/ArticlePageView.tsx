import { debounce } from "@mui/material"
import { Box, Grid } from "@mui/material"
import { useState } from "react"
import { MainLayout } from "../components/common/MainLayout"
import { Form, Formik } from 'formik'
import { Inputs } from "../components/ArticlePage/Inputs"
import { Preview } from "../components/ArticlePage/Preview"
import { Headlines } from "../components/ArticlePage/Headlines"
import { CategoryDto } from "../types"
import useAddArticle from '../hooks/useAddArticle'
import useSaveArticle from '../hooks/useSaveArticle'
import useSaveAndFrowardArticleToRedaction from '../hooks/useSaveAndForwardArticleToRedaction'
import { ArticleDto, ChapterDto, DefaultArticleStyle, PartialArticleDto } from "../hooks/types"
import { publishArticleValidation } from '../valdiations/publishArticle'
import { LoadingButton } from '@mui/lab';
import { ConfirmDeleteDialog } from '../components/ArticlePage/ConfirmDeleteDialog';
import { ConfirmRollbackDialog } from "../components/ArticlePage/ConfirmRollbackDialog"
import { ConfirmForwardDialog } from "../components/ArticlePage/ConfirmForwardDialog"

type FormData = {
  title: string
  text: string
}

type Props = {
  isRedactor: boolean
  article?: PartialArticleDto & { id: number }
}

export const ArticlePageView = (props: Props) => {
  const addArticle = useAddArticle()
  const saveArticle = useSaveArticle()
  const saveAndForwardArticleToRedaction = useSaveAndFrowardArticleToRedaction()

  const [previewTitle, setPreviewTitle] = useState(props.article?.title ?? '')
  const [previewText, setPreviewText] = useState(props.article?.text ?? '')

  const handleTextChange = debounce((text: string) => setPreviewText(text), 100)
  const handleTitleChange = debounce((title: string) => setPreviewTitle(title), 100)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [rollbackDialogOpen, setRollbackDialogOpen] = useState(false)
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false)

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >
        <Formik<FormData>
          initialValues={props.article ? {
            title: props.article.title,
            text: props.article.text,
            // tags: props.article.tags.map(t => t.name),
            // chapters: props.article.chapters,
            // category: props.article.category
          } : {
            title: '',
            text: '',
            //tags: [],
            //chapters: [],
            //category: props.categories[0]
          }}
          onSubmit={(data) => {
            
            saveAndForwardArticleToRedaction.mutate({
            formData: {
              // ...data,
              title: data.title,
              text: data.text,
              id: props.article!.id,
            } as ArticleDto & { id: number },
            type: props.isRedactor ? 'publish' : 'submit'
          })}}
          validationSchema={props.isRedactor ? publishArticleValidation : undefined}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formikProps) => (
            <Form style={{ width: '100%' }}>
              <Grid
                container
                direction={'row'}
                width={'100%'}
                height={'100%'}
                justifyContent={'space-between'}
                paddingRight={'14px'}
              >
                <Headlines edit={Boolean(props.article)} isRedacting={props.isRedactor}/>
        
                <Inputs
                  onTextChange={() => {
                    if (formikProps.values.text) {
                      formikProps.errors.text =  undefined
                    }
                    handleTextChange(formikProps.values.text)
                  }}
                  onTitleChange={() => {
                    if (formikProps.values.title) {
                      formikProps.errors.title =  undefined
                    }
                    handleTitleChange(formikProps.values.title)
                  }}
                />

                <Grid
                  container item
                  direction={'column'}
                  xs={7}
                  justifyContent={'space-between'}
                >
                  <Preview 
                    title={previewTitle}
                    text={previewText}
                  />
                </Grid>
              </Grid>

              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                marginTop={'32px'}
                gap={'8px'}
              >
                <LoadingButton
                  loading={saveArticle.isLoading || addArticle.isLoading}
                  variant='contained'
                  sx={{ 
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: '700'
                  }}
                  onClick={() => {
                    const data: PartialArticleDto = {
                      title: previewTitle,
                      text: previewText
                    }

                    if (props.article) {
                      saveArticle.mutate({ ...data, id: props.article.id })
                    } else {
                      addArticle.mutate(data)
                    }
                  }}
                >
                  { props.article ? 'Zapisz' : 'Utwórz Blog' }
                </LoadingButton>

                {
                  props.article &&
                  <>
                    <LoadingButton
                      //loading={deleteArticle.isLoading}
                      variant='contained'
                      sx={{ 
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: '700',
                        backgroundColor: 'red',
                        ':hover': {
                          backgroundColor: 'darkred'
                        }
                      }}
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Usuń
                    </LoadingButton>
                    <ConfirmDeleteDialog onClose={() => setDeleteDialogOpen(false)} open={deleteDialogOpen} articleId={props.article.id} articleTitle={props.article.title}/>
                  </>
                }
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}