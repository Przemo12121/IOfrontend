import { Dialog, DialogTitle } from '@mui/material'
import useDeleteArticle from '../../hooks/useDeleteArticle'
import { LoadingButton } from '@mui/lab'
import Typography from '@mui/material/Typography';

type Props = {
  onClose: () => void
  open: boolean
  articleId: number
  articleTitle: string
}

export const ConfirmDeleteDialog = (props: Props) => {
  const deleteArticle = useDeleteArticle()

  return (
    <Dialog 
      onClose={props.onClose}
      open={props.open}
      PaperProps={{
        sx: {
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle>Potwierdź usunięcie</DialogTitle>
      <Typography>Czy napewno chcesz usunąć artykuł o id: <b>{props.articleId}</b> oraz tytule: <b>{props.articleTitle}</b>?</Typography>
      <LoadingButton
        loading={deleteArticle.isLoading}
        variant='contained'
        sx={{ 
          color: 'white',
          textTransform: 'none',
          fontWeight: '700',
          backgroundColor: 'red',
          marginTop: '24px',
          width: '220px',
          alignSelf: 'center',
          ':hover': {
            backgroundColor: 'darkred'
          }
        }}
        onClick={() => deleteArticle.mutate(props.articleId)}
      >
        Potwierdzam usunięcie
      </LoadingButton>
    </Dialog>
  )
}