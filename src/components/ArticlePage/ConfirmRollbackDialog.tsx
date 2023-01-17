import { Dialog, DialogTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Typography from '@mui/material/Typography';
import useRollbackArticle from '../../hooks/useRollbackArticle';

type Props = {
  onClose: () => void
  open: boolean
  articleId: number
  articleTitle: string
}

export const ConfirmRollbackDialog = (props: Props) => {
  const rollbackArticle = useRollbackArticle()

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
      <DialogTitle>Potwierdź wycofwanie</DialogTitle>
      <Typography>Czy napewno chcesz wycofać artykuł o id: <b>{props.articleId}</b> oraz tytule: <b>{props.articleTitle}</b> do autora?</Typography>
      <LoadingButton
        loading={rollbackArticle.isLoading}
        variant='contained'
        sx={{ 
          color: 'white',
          textTransform: 'none',
          fontWeight: '700',
          backgroundColor: 'darkorange',
          marginTop: '24px',
          width: '220px',
          alignSelf: 'center',
          ':hover': {
            backgroundColor: 'a66101'
          }
        }}
        onClick={() => rollbackArticle.mutate(props.articleId)}
      >
        Potwierdzam wycofwanie
      </LoadingButton>
    </Dialog>
  )
}