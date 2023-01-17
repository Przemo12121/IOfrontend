import { Box } from '@mui/material';
import { Header } from './Header';

export const MainLayout = (props: { children?: JSX.Element | JSX.Element[] | never }) => {
  
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      height={'100vh'}
    >
      <Header/>

      <Box
        flexGrow={1}
        // width={'100%'}
        padding={'48px 40px 48px 40px'}
      >
        {props.children}
      </Box>
    </Box>
  )
}