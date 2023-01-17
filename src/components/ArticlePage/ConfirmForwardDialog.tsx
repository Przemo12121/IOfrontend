import { Dialog, DialogTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Typography from '@mui/material/Typography';

type Props = {
  onClose: () => void
  open: boolean
  articleId: number
  articleTitle: string
  isLoading: boolean
  type: 'publish' | 'submit'
  submit: () => void
}

export const ConfirmForwardDialog = (props: Props) => {
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
      <DialogTitle>Potwierdź operację</DialogTitle>
      {
        props.type === 'publish'
          ? <Typography>Czy napewno chcesz opublikować artykuł o id: <b>{props.articleId}</b> oraz tytule: <b>{props.articleTitle}</b></Typography>
          : <Typography>Czy napewno chcesz przeazać artykuł o id: <b>{props.articleId}</b> oraz tytule: <b>{props.articleTitle}</b> do redagowania?</Typography>
      }
      <LoadingButton
        loading={props.isLoading}
        variant='contained'
        sx={{ 
          color: 'white',
          textTransform: 'none',
          fontWeight: '700',
          marginTop: '24px',
          width: '400px',
          alignSelf: 'center',
        }}
        type='submit'
        onClick={props.submit}
      >
        {
          props.type === 'publish'
            ? 'Potwierdzam opublikowanie'
            : 'Potwierdzam przekazanie do redagowania'
        }
      </LoadingButton>
    </Dialog>
  )
}