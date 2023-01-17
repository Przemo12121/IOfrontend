import { Box, CircularProgress } from "@mui/material"

const LoadingPage = () => {
  return (
    <Box 
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <CircularProgress size={'80px'}/>
    </Box>
  )
}

export default LoadingPage