import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { RegisterContainer } from './style'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/userApi';
import StatesContext from '../../context/StatesContext';
import axios from 'axios'


const Register = () => {

    const context = useContext(StatesContext)
    const { setUserInfo } = context
    const navigate = useNavigate()

    const [registerUser, responseInfo] = useRegisterUserMutation()


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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()
    const [passError, setPassError] = useState(false)

    const handleSubmit = (e) => {

        setPassError(false)
        e.preventDefault()

        if (password === confirmPassword) {

            const myForm = new FormData()

            myForm.set('email', email)
            myForm.set('password', password)
            myForm.set('name', name)

            registerUser(myForm)
        } else {
            setPassError(true)
        }


    }


    useEffect(() => {

        if (responseInfo.status === 'fulfilled') {
            setUserInfo(responseInfo.data.user)
            navigate('/')

        }

    }, [responseInfo])



    return (
        <RegisterContainer>
            <Box width={{ xs: '100%', sm: '17rem', md: '18rem' }}>
                <Typography fontSize={'35px'} fontWeight='bold'>Sign Up</Typography>
                <Typography fontSize={'20px'} color='#757575'>See your growth and get consulting support!</Typography>
                <Button variant="outlined" startIcon={<FcGoogle />} className='google-btn' onClick={() => login()}>
                    Sign up with google
                </Button>
                <Box marginTop={'1rem'}>

                </Box>
                <Box margin={'1rem 0'}>
                    <Typography className='signtext'>or Sign up with Email</Typography>
                </Box>

                <Box component={'form'} onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        placeholder='Name'
                        className='email-feild'
                        required
                        onChange={e => setName(e.target.value)}
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

                    <TextField
                        placeholder='Confirm password'
                        className='email-feild'
                        type={'password'}
                        required
                        sx={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}
                        onChange={e => setconfirmPassword(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                fontSize: 20,

                            }
                        }}
                        variant="standard"
                    />

                    {responseInfo.error && (
                        <Typography fontSize={'20px'} color='red' marginTop={'10px'}>{responseInfo.error.data.message}</Typography>
                    )}
                    {passError && (
                        <Typography fontSize={'20px'} color='red' marginTop={'10px'}>Password does not match</Typography>
                    )}

                    <Button sx={{ textTransform: 'capitalize', width: '100%', marginTop: '1rem', borderRadius: '25px' }} variant='contained' type='submit'>
                        {responseInfo.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Sign Up'}
                    </Button>

                    <Box display='flex' marginTop={'1rem'}>
                        <Typography fontSize={'18px'}>Already have an Account?</Typography>
                        <Link className='reg-link' to={'/login'}>Sign in</Link>
                    </Box>
                </Box>
            </Box>


        </RegisterContainer>
    )
}

export default Register