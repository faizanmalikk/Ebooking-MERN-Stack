import { Box, CircularProgress, CssBaseline } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ChangePass, Home, HotelDetails, Hotels, Login, Profile, Register, Update } from './pages'
import webFont from 'webfontloader'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useLoadUserQuery } from './services/userApi'
import StatesContext from './context/StatesContext'
import AuthRoutes from './routes/authRoutes'
import ProtectedRoute from './routes/protectedRoute'


const App = () => {

  const context = useContext(StatesContext)
  const { setUserInfo, setDates ,dates} = context

  const { data, isFetching } = useLoadUserQuery()

  useEffect(() => {

    webFont.load({
      google: {
        families: ['Roboto', 'Macondo']
      }
    })

    if (data) {

      setUserInfo(data.user)
    }

  }, [data])

  useEffect(() => {

    const retriveDates = JSON.parse(localStorage.getItem('dates'))
    if (retriveDates) {
      setDates([
        {
          startDate: new Date(retriveDates[0].startDate),
          endDate: new Date(retriveDates[0].endDate),
          key: "selection",
        },
      ])
    }

  }, [])


  return (
    <>
      {isFetching ? (
        <Box display='flex' justifyContent={'center'} alignItems='center' height='100vh'>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box >
          <CssBaseline />
          <GoogleOAuthProvider clientId='852054508172-d8q29tuv0i98r8ghqss3rsf52q42s3jm.apps.googleusercontent.com' >

            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/hotels' element={<Hotels />} />
              <Route exact path='/hotel/:id' element={<HotelDetails />} />

              {/* Auth Routes */}

              <Route element={<AuthRoutes  data={data}/>}>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
              </Route>

              {/* Protected Routes */}

              <Route element={<ProtectedRoute data={data} />}>
                
                <Route exact path='/me' element={<Profile />} />
                <Route exact path='/me/update' element={<Update />} />
                <Route exact path='/password/update' element={<ChangePass />} />
              
              </Route>
            </Routes>



          </GoogleOAuthProvider>
        </Box>
      )}
    </>
  )
}

export default App