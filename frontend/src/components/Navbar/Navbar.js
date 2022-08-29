import { AppBar, Avatar, Box, Button, Container, IconButton,  Typography, useMediaQuery } from '@mui/material'
import React, { useContext,  useState } from 'react'
import { StyledBox } from './style'
import { Link } from 'react-router-dom'
import { CarRental, DirectionsCar, Flight, Hotel, KeyboardArrowDown } from '@mui/icons-material'
import StatesContext from '../../context/StatesContext'
import UserProfile from '../UserProfile/UserProfile'

const data = [
    { icon: <Hotel sx={{ fontSize: '25px' }} />, name: 'stays' },
    { icon: <Flight sx={{ fontSize: '25px' }} />, name: 'flights' },
    { icon: <CarRental sx={{ fontSize: '25px' }} />, name: 'car rentals' },
    { icon: <Hotel sx={{ fontSize: '25px' }} />, name: 'attractions' },
    { icon: <DirectionsCar sx={{ fontSize: '25px' }} />, name: 'airport taxis' },
]

const Navbar = () => {

    const smallerthen340 = useMediaQuery('(max-width:340px)')

 

    const [profileOpen, setProfileOpen] = useState(false)

    const context = useContext(StatesContext)
    const { setUserInfo, userInfo } = context


    return (
        <AppBar sx={{ backgroundColor: '#01579b' }} position='static'>
            <Container maxWidth='xl'>
                <StyledBox>
                    <Box display='flex' justifyContent={'space-between'} >
                        <Typography component={Link} to='/' sx={{ textDecoration: 'none', color: 'white' }} fontFamily={'Macondo'} fontSize='30px' >EBooking</Typography>
                        {userInfo ? (
                            <Box  sx={{ position: 'relative' }}>
                                    <IconButton onClick={() => setProfileOpen(true)} sx={{borderRadius : '10px'}} >
                                        <Avatar src={userInfo.avatar && userInfo.avatar.url} sx={{ height: '50px', width: '50px' }} />
                                        <Typography fontSize={'15px'} color='#9e9e9e' padding='0 10px'>Hi, </Typography>
                                        <Typography fontSize={'15px'} color='#9e9e9e' fontWeight={'bold'}>{userInfo.name} </Typography>
                                        <KeyboardArrowDown sx={{ fontSize: '20px', marginLeft: '5px',color:'#9e9e9e' }} />
                                    </IconButton>
                                <UserProfile profileOpen={profileOpen} setProfileOpen={setProfileOpen}  />
                            </Box>
                        ) : (

                            <Box display='flex' gap='10px'>
                                <Button component={Link} to='/register' className='nav-btn' sx={{ display: smallerthen340 && 'none' }}>
                                    Register
                                </Button>
                                <Button component={Link} to='/login' className='nav-btn'>
                                    Login
                                </Button>
                            </Box>
                        )}
                    </Box>



                </StyledBox>

            </Container>
        </AppBar>
    )
}

export default Navbar