import { Box, Grid } from '@mui/material';
import { MainLayout } from '../components/common/MainLayout';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { CredentialsDto } from '../hooks/types';
import useLogin from '../hooks/useLogin';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab'

export const LoginPage = () => {
  const loginMutation = useLogin()

  return (
    <MainLayout>
      <Formik<CredentialsDto>
        initialValues={{ email: '', password: ''}}
        onSubmit={(data) => loginMutation.mutate(data)}
      >
        {() => (
          <Form>
            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} paddingTop={'42px'}>
              <Grid
                container
                width={'360px'}
                sx={{backgroundColor: '#fafafa'}}
                alignItems={'center'}
                direction={'column'}
                boxShadow={4}
                borderRadius={'20px'}
                padding={'32px 32px'}
                gap={'32px'}
              >
                <Typography variant='h3'>Zaloguj się</Typography>
                <Field as={TextField} 
                  fullWidth
                  name='email'
                  size='small'
                  label='login'
                />
                <Field as={TextField}
                  fullWidth
                  type='password'
                  name='password'
                  size='small'
                  label='password'
                />
                <LoadingButton
                  loading={loginMutation.isLoading}
                  type='submit'
                  variant='contained'
                  sx={{
                    color: 'white',
                    fontSize: '18px',
                    textTransform: 'none',
                    padding: '4px 24px',
                    borderRadius: '8px'
                  }}
                >
                  Zaloguj
                </LoadingButton>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </MainLayout>
  )
}