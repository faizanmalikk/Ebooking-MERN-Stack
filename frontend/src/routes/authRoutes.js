import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StatesContext from '../context/StatesContext'


const AuthRoutes = ({data}) => {
  

    const context = useContext(StatesContext)
    const { userInfo } = context

    return  userInfo || data && data.user ? <Navigate to={'/me'}/> : <Outlet />   

}

export default AuthRoutes