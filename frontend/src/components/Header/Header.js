import React, { useContext, useState } from 'react'
import { Add, CalendarMonth, Hotel, Remove, Boy } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField, Typography, Container, useMediaQuery } from '@mui/material'
import { DateRange } from 'react-date-range'
import { HeaderContainer } from './style'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import StatesContext from '../../context/StatesContext'

const Header = () => {

  const smallerthen340 = useMediaQuery('(max-width:340px)')
  const navigate = useNavigate()

  const [openDate, setopenDate] = useState(false)
  const [openRoom, setopenRoom] = useState(false)

  const context = useContext(StatesContext)
  const {
    setdestination,
    options, setOptions,
    dates, setDates,
    userInfo
  } = context

  const handleOption = (name, operation) => {

    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
      }
    })

  }

  const handleSearch = () => {

    navigate('/hotels')

  }

  return (
    <HeaderContainer>
      <Container maxWidth='xl' >
        <Box sx={{ position: 'relative' }}>
          <Box paddingTop={'1rem'} >
            <Typography fontSize={'35px'} fontWeight='bold' color='white'>
              A Lifetime of discount? It's Genius.
            </Typography>
            <Typography color='#e0e0e0' >
              Get rewarded for you travels - unlock instant savings of 10% or more with a free ebooking account
            </Typography>
            {!userInfo ? (
              <Button component={Link} to='/login' variant='outlined' className='reg-btn'>
                Sign in / Register
              </Button>
            ) : (
              <Button
                disableRipple
                sx={{
                  backgroundColor: '#01579b',
                  marginBottom: { xs: '0', md: '5rem' },
                  marginTop: '1rem',
                }}
                ></Button>
            )}
          </Box>

          <Box className='search-con'>
            <Box flex={{ md: '0.5', lg: '0.7' }} display='flex' justifyContent={'center'} alignItems={'center'} paddingLeft={{ md: '10px' }} border={{ xs: '3px solid #ff9800', md: 'none' }} width={{ xs: '100%', sm: '80%', md: 'unset' }} padding='5px 0'
            >
              <TextField
                id="input-with-icon-textfield"
                placeholder='Where are you going?'
                onChange={e => setdestination(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Hotel sx={{ marginBottom: '3px', marginRight: '10px', color: '#9e9e9e' }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  style: {
                    fontSize: 20, width: smallerthen340 ? 230 : 270,
                  }

                }}
                variant="standard"

              />
            </Box>
            <Box flex={{ md: '1' }} display='flex' gap='10px' alignItems={'center'} justifyContent='center' sx={{ position: 'relative' }} border={{ xs: '3px solid #ff9800', md: 'none' }} width={{ xs: '100%', sm: '80%', md: 'unset' }} padding='5px 0'>
              <CalendarMonth sx={{ color: '#9e9e9e', marginBottom: '3px' }} />
              <Typography onClick={() => setopenDate(!openDate)} className='date-con' >
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </Typography>
              {openDate && (
                <motion.div
                  animate={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5, delayChildren: 0.5 }}
                  className="date"

                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className='calender'
                    minDate={new Date()}
                
                  />
                </motion.div>
              )}
            </Box>
            <Box flex={{ md: '1' }} display='flex' gap='7px' alignItems={'center'} justifyContent='center' sx={{ position: 'relative' }} border={{ xs: '3px solid #ff9800', md: 'none' }} width={{ xs: '100%', sm: '80%', md: 'unset' }} padding='5px 0'>
              <Boy sx={{ color: '#9e9e9e', marginBottom: '3px' }} />
              <Typography className='date-con' onClick={() => setopenRoom(!openRoom)}>{options.adult} Adults {options.children} children {options.room} room</Typography>
              {openRoom && (
                <motion.div
                  animate={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5, delayChildren: 0.5 }}
                  className='room-con'>
                  <Box display='flex' justifyContent='space-between' alignItems={'center'} padding='1rem 0' borderBottom='1px solid #9e9e9e'>
                    <Typography color='#757575' fontSize={'20px'}>Adults</Typography>
                    <Box display='flex' gap='10px' alignItems={'center'} >
                      <IconButton className='add-btn' disabled={options.adult <= 1 && true} onClick={() => handleOption('adult', 'd')}>
                        <Remove sx={{ fontSize: '20px' }} />
                      </IconButton>
                      <Typography color='blue'>{options.adult}</Typography>
                      <IconButton className='add-btn' onClick={() => handleOption('adult', 'i')}>
                        <Add sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box display='flex' justifyContent='space-between' alignItems={'center'} padding='1rem 0' borderBottom='1px solid #9e9e9e'>
                    <Typography color='#757575' fontSize={'20px'}>Children</Typography>
                    <Box display='flex' gap='10px' alignItems={'center'} >
                      <IconButton className='add-btn' disabled={options.children <= 0 && true} onClick={() => handleOption('children', 'd')}>
                        <Remove sx={{ fontSize: '20px' }} />
                      </IconButton>
                      <Typography color='blue'>{options.children}</Typography>
                      <IconButton className='add-btn' onClick={() => handleOption('children', 'i')}>
                        <Add sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box display='flex' justifyContent='space-between' alignItems={'center'} padding='1rem 0' >
                    <Typography color='#757575' fontSize={'20px'}>Rooms</Typography>
                    <Box display='flex' gap='10px' alignItems={'center'} >
                      <IconButton className='add-btn' disabled={options.room <= 1 && true} onClick={() => handleOption('room', 'd')}>
                        <Remove sx={{ fontSize: '20px' }} />
                      </IconButton>
                      <Typography color='blue'>{options.room}</Typography>
                      <IconButton className='add-btn' onClick={() => handleOption('room', 'i')}>
                        <Add sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </motion.div>

              )}
            </Box>
            <Box flex={{ md: '0.2' }} display='flex' justifyContent={'flex-end'} border={{ xs: '3px solid #ff9800', md: 'none' }} width={{ xs: '100%', sm: '80%', md: 'unset' }}>
              <Button variant='contained' sx={{ textTransform: 'capitalize', fontSize: '22px', width: '100%' }} onClick={() => handleSearch()}>Search</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </HeaderContainer>
  )
}

export default Header