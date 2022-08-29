import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { LoginContainer } from './style'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/userApi';
import StatesContext from '../../context/StatesContext';
import axios from 'axios'


const Login = () => {

    const context = useContext(StatesContext)
    const { setUserInfo, userInfo } = context
    const navigate = useNavigate()
    const { search } = useLocation()
   

    const [loginUser, response] = useLoginUserMutation()
    const [registerUser, responseInfo] = useRegisterUserMutation()

    const redirect = search ? search.split("=")[1] : '/'

    const fetchUser = async (response) => {

        let userData = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)


        const { name, picture: image, email, sub } = userData.data

        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('avatar', image)
        myForm.set('email', email)
        myForm.set('googleId', sub)
        myForm.set('password', sub)

        registerUser(myForm)


    }

    const login = useGoogleLogin({
        onSuccess: response => {

            fetchUser(response)
        },

        onError: tokenResponse => console.log(tokenResponse),

    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {

        e.preventDefault()

        const myForm = new FormData()

        myForm.set('email', email)
        myForm.set('password', password)

        loginUser(myForm)

    }

    
    useEffect(() => {

        if (response.status === 'fulfilled') {
            setUserInfo(response.data.user)
            navigate(redirect,{replace : true})
        }
        if (responseInfo.status === 'fulfilled') {
            setUserInfo(responseInfo.data.user)
            navigate(redirect,{replace : true})

        }

    }, [response, responseInfo])



    return (
        <LoginContainer>
            <Box width={{ xs: '100%', sm: '17rem', md: '18rem' }}>
                <Typography fontSize={'35px'} fontWeight='bold'>Login</Typography>
                <Typography fontSize={'20px'} color='#757575'>See your growth and get consulting support!</Typography>
                <Button variant="outlined" startIcon={<FcGoogle />} className='google-btn' onClick={() => login()}>
                    Sign in with google
                </Button>
                <Box marginTop={'1rem'}>
         
                </Box>
                <Box margin={'1rem 0'}>
                    <Typography className='signtext'>or Sign in with Email</Typography>
                </Box>

                <Box component={'form'} onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        placeholder='Email'
                        className='email-feild'
                        type={'email'}
                        required
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                fontSize: 20,
                            }
                        }}
                        variant="standard"
                        sx={{ marginBottom: '1.5rem' }}
                    />
                    <TextField
                        placeholder='Password'
                        className='email-feild'
                        type={'password'}
                        required
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                fontSize: 20,
                            }
                        }}
                        variant="standard"
                    />

                    {response.error && (
                        <Typography fontSize={'20px'} color='red' marginTop={'10px'}>{response.error.data.message}</Typography>
                    )}
    

                    <Button sx={{ textTransform: 'capitalize', width: '100%', marginTop: '1rem', borderRadius : '25px' }} variant='contained' type='submit'>
                        {response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Login'}
                    </Button>

                    <Box display='flex' marginTop={'1rem'}>
                        <Typography fontSize={'18px'}>Not registered yet?</Typography>
                        <Link className='reg-link' to={'/register'}>Create an account</Link>
                    </Box>
                </Box>
            </Box>


        </LoginContainer>
    )
}

export default Login