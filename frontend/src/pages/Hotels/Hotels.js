import { Box, Button, TextField, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext, useState } from 'react'
import { ListItems, Navbar } from '../../components'
import { StyledBox } from './style'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { DateRange } from 'react-date-range'
import { useGetAllHotelsQuery } from '../../services/hotelsApi'
import StatesContext from '../../context/StatesContext'

const typedata = [
  'hotel', 'apartment', 'villas', 'cabin', 'resort'
]


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
     
    },
  },
};

const Hotels = () => {

  const context = useContext(StatesContext)
  const {
    destination, setdestination,
    options,
    dates, setDates,
    type, settype
  } = context

  const [openDate, setopenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, isFetching, refetch } = useGetAllHotelsQuery({ destination, min, max , type })



  return (
    <Box>
      <Navbar />
      <Container maxWidth='xl' sx={{ marginTop: '1rem' }}>
        <StyledBox>
          <Box flex={{ lg: 1 }} className='search-con'>
            <Typography fontWeight={'bold'} fontSize='28px' textAlign={'center'}>Search</Typography>
            <Box>
              <Typography fontSize={'20px'}>Destination</Typography>
              <TextField
                id="input-with-icon-textfield"
                placeholder='Where are you going?'
                onChange={e => setdestination(e.target.value)}
                value={destination}
                className='search-input'
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                  }
                }}
                variant="standard"
              />
            </Box>

            <Box>
              <Typography fontSize={'20px'}>Type</Typography>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  disableUnderline
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding : '5px'
                  }}
                  MenuProps={MenuProps}
                >
                  {typedata.map((item, i) => (
                    <MenuItem value={item} key={i}>{item}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography fontSize={'20px'}>Check in Date</Typography>
              <Box sx={{ position: 'relative' }}>
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
            </Box>
            <Box>
              <Typography fontSize={'20px'}>Options</Typography>
              <Box padding='10px' display='flex' flexDirection={'column'} justifyContent={'space-between'} alignItems='center' gap='10px'>
                <Box display={'flex'} justifyContent='space-between' alignItems={'center'} width='100%'>
                  <Typography fontSize={'19px'}>Min price per night</Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    className='search-option'
                    onChange={(e) => setMin(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 20,
                      }
                    }}
                    variant="standard"
                  />
                </Box>
                <Box display='flex' justifyContent={'space-between'} alignItems='center' width='100%'>
                  <Typography fontSize={'19px'}>Max price per night</Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    className='search-option'
                    onChange={(e) => setMax(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 20,
                      }
                    }}
                    variant="standard"
                  />
                </Box>
                <Box display='flex' justifyContent={'space-between'} alignItems='center' width='100%'>
                  <Typography fontSize={'19px'}>Adult</Typography>
                  <TextField
                    componet='input'
                    id="input-with-icon-textfield"
                    placeholder={options.adult}
                    className='search-option'
                    type='number'
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 20,
                      },
                      inputProps: { min: 1 }
                    }}
                    variant="standard"
                  />
                </Box>
                <Box display='flex' justifyContent={'space-between'} alignItems='center' width='100%'>
                  <Typography fontSize={'19px'}>Children</Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    placeholder={options.children}
                    className='search-option'
                    type='number'
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 20,
                      },
                      inputProps: { min: 0 }
                    }}
                    variant="standard"
                  />
                </Box>
                <Box display='flex' justifyContent={'space-between'} alignItems='center' width='100%'>
                  <Typography fontSize={'19px'}>Room</Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    className='search-option'
                    placeholder={options.room}
                    type='number'
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 20,
                      },
                      inputProps: { min: 1 }
                    }}
                    variant="standard"
                  />
                </Box>
              </Box>
              <Box>

              </Box>
              <Button variant='contained' onClick={() => refetch()} sx={{ width: '100%', marginTop: '1rem' }}>Search</Button>
            </Box>
          </Box>

          <Box flex={{ lg: 3 }} display='flex' flexDirection={'column'} gap='15px'>
            {isFetching ? (
              <Box display='flex' justifyContent={'center'} height='50vh' alignItems={'center'}>
                <CircularProgress size={70} />

              </Box>
            ) : (

              <Box >
                {data.hotel.length ? (
                  <>
                    {data.hotel.map((item, i) => (
                      <ListItems data={item} key={i} />
                    ))}
                  </>
                ) : (
                  <Box display='flex' justifyContent={'center'} height='50vh' alignItems={'center'}>
                    <Typography fontSize={'35px'} fontWeight='bold'>Nothing Found...</Typography>
                  </Box>
                )}

              </Box>
            )
            }

          </Box>
        </StyledBox>
      </Container>
    </Box>
  )
}

export default Hotels