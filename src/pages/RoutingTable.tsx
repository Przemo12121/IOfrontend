import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ArticlePage } from './ArticlePage'
import { LoginPage } from './LoginPage';
import { getUser } from '../hooks/store';

export const RoutingTable = () => {
  const user = { email: 'testowy@user.io', role: 'AUTOR', token: 'XYZ' }

  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {
          !user
            ? <>
                <Route index element={<Navigate to={'/login'}/>}/>
                <Route path='login' element={<LoginPage/>}/>
              </>
            : <>
                <Route index element={<Navigate to={'/articles/manage'} />} />
                <Route path='articles' element={<Outlet />}>
                  <Route path='manage' element={<ArticlePage/>}/>
                  {/* <Route path='list' element={<ArticlePage/>}/> //TODO lista*/}
                </Route>
              </> 

        }
      <Route path='*' element={<Navigate to={'/'}/>}/>
        {/* <Route index element={<Login/>}> //TODO login*/}
        
        {/* <Route path='article' element={</>}/> //TODO wyswietlenie/preview*/}
      </Route>
    </Routes>
  )
}