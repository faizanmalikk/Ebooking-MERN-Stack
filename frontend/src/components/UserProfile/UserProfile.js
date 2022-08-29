import React, { useContext, useEffect } from 'react'
import { useTheme } from '@emotion/react';
import { Cancel, Settings } from '@mui/icons-material';
import { Box, Button, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material'
import { StyledProfile } from './style';
import StatesContext from '../../context/StatesContext';
import { useLogoutUserMutation } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';



const UserProfile = ({ profileOpen, setProfileOpen }) => {


    const context = useContext(StatesContext)
    const { setUserInfo, userInfo } = context
    const navigate = useNavigate()

    const [logoutUser, response] = useLogoutUserMutation()

    const fullScreen = useMediaQuery('(max-width:600px)')

    useEffect(() => {

        if (response.status === 'fulfilled') {
            setUserInfo('')
        }

    }, [response])

    return (

        <Dialog
            fullScreen={fullScreen}
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
            aria-labelledby="responsive-dialog-title"
            PaperProps={!fullScreen && {
                sx: {
                    position: 'absolute', top: '3rem', right: '0',
                    width: { md: '20rem', lg: '23rem' }
                },

            }}

        >
            <StyledProfile padding='2rem 1rem' >

                <Box display={'flex'} justifyContent='space-between' alignItems={'center'}>
                    <Typography fontWeight='bold' fontSize='30px'>User Profile</Typography>
                    <IconButton className='cancel-icon' onClick={() => setProfileOpen(false)}>
                        <Cancel />
                    </IconButton>
                </Box>

                <Box marginTop={'1rem'} display='flex' gap='1rem' alignItems={'center'}>
                    <Box component='img' src={userInfo.avatar.url} width='120px' height='120px' borderRadius='50%' />
                    <Box>
                        <Typography fontSize='30px' fontWeight={'bold'}>{userInfo.name}</Typography>
                        <Typography fontSize='17px' color='#757575' fontWeight={'bold'}>{userInfo.email}</Typography>
                    </Box>
                </Box>

                <Box className='profile-con' >
                    <Box display='flex' gap='1rem' onClick={() => navigate('/me')}>
                        <IconButton disableRipple
                            sx={{
                                backgroundColor: '#E5FAFB',
                                color: '#03C9D7',
                                height: '80px',
                                width: '80px',
                                borderRadius: '50%'
                            }}>
                            <Settings />
                        </IconButton>
                        <Box>
                            <Typography fontSize={'25px'} fontWeight='bold'>My Profile</Typography>
                            <Typography fontSize={'20px'} color='#757575' >Account Settings</Typography>
                        </Box>
                    </Box>

                </Box>

                <Box display='flex' justifyContent={'center'} marginTop='1rem'>
                    <Button className='btn' variant='contained'
                        onClick={() => logoutUser()}
                        sx={{
                            width: { md: '100%' }
                        }}>
                        Logout
                    </Button>
                </Box>

            </StyledProfile>

        </Dialog>
    )
}

export default UserProfile