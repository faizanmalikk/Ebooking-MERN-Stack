import React, { useContext, useEffect, useState } from 'react'
import { StyledBox } from './style'
import { MailList, Navbar, Reserve } from '../../components'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { LocationOn } from '@mui/icons-material'
import img from '../../assets/img2.jpg'
import img2 from '../../assets/ok.jpg'
import ShowImages from './ShowImages/ShowImages'
import { useHotelDetailsQuery } from '../../services/hotelsApi'
import { useNavigate, useParams } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'
import SelectDates from './SelectDates/SelectDates'

const data = [
  { image: img },
  { image: img2 },
  { image: img },
  { image: img2 },
  { image: img },
  { image: img2 },
]


const HotelDetails = () => {

  const { id } = useParams()

  const { data: hotelDetail, isFetching } = useHotelDetailsQuery(id)
  const context = useContext(StatesContext)
  const { dates, options, userInfo } = context
  const navigate = useNavigate()

  const [slideIndex, setslideIndex] = useState()
  const [imageOpen, setImageOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isDates, setIsDates] = useState(false)

  const handleImageOpen = (i) => {
    setslideIndex(i)
    setImageOpen(true)
  }


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleReserve = () => {
    if (userInfo) {
      if (days > 0) {
        setOpenModal(true)
      } else {
        setIsDates(true)
      }
    } else {
      navigate(`/login?redirect=/hotel/${id}`, { replace: true })
    }

  }

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [])

  return (

    <StyledBox>
      <Navbar />
      {isFetching ? (
        <Box display='flex' justifyContent={'center'} height='70vh' alignItems={'center'}>
          <CircularProgress size={70} />

        </Box>
      ) : (
        <>
          <Container maxWidth='xl' sx={{ marginTop: '2rem' }}>
            <Box display='flex' justifyContent='space-between'>
              <Typography fontSize='35px' fontWeight={'bold'}>{hotelDetail.hotel.name}</Typography>
              <Button variant='contained'
                sx={{
                  textTransform: 'capitalize',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  display: { xs: 'none', sm: 'inline-block' }
                }}
                onClick={handleReserve}
              >Reserve or Book Now!</Button>
            </Box>

            <Box display='flex' gap='5px' alignItems={'center'}>
              <LocationOn sx={{ color: '#757575', fontSize: '19px' }} />
              <Typography color='#757575' fontSize={'19px'}>{hotelDetail.hotel.address}</Typography>
            </Box>

            <Typography color='#01579b' fontWeight={'bold'} fontSize={'23px'} marginTop='10px'>Excellent location - {hotelDetail.hotel.distance} from center</Typography>
            <Typography color='green' fontWeight={'bold'} fontSize={'23px'} marginTop='10px'>Book a stay over $144 at this property and get a free airport taxi</Typography>

            <Box display='flex' gap='10px' flexWrap={'wrap'} justifyContent='center' margin='1.5rem 0'>
              {hotelDetail.hotel.images.map((item, i) => {
                return <Box
                  component={'img'}
                  src={item.url}
                  key={i}
                  width={{ xs: '90%', sm: '80%', md: '30%', lg: '32%' }}
                  onClick={() => handleImageOpen(i)}
                  sx={{ cursor: 'pointer' }}
                />
              })}
            </Box>

            <Box display='flex' gap={{ xs: '1rem', md: '10px' }} flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center', md: 'unset' }}>
              <Box flex={{ md: '3' }}>
                <Typography fontWeight={'bold'} fontSize='30px'>{hotelDetail.hotel.title}</Typography>
                <Typography color='#757575' fontSize='19px' marginTop={'10px'}>
                  {hotelDetail.hotel.desc}
                </Typography>
              </Box>

              <Box flex={{ md: '1' }} className='booking-con'>
                <Typography fontWeight={'bold'} color='#757575' textAlign={'center'} fontSize='28px'>Perfect for a night stay!</Typography>
                <Typography fontSize={'19px'} marginTop='0.7rem'>
                  Located at the heart of kabab this property has an average rating of 8.9 and it is a peacfull place
                </Typography>
                <Box display='flex' alignItems={'center'}>
                  <Typography fontWeight={'bold'} fontSize='28px' marginTop={'0.7rem'}>${days * options.room * hotelDetail.hotel.cheapestPrice}</Typography>
                  <Typography fontSize='28px' paddingTop={'12px'}>({days} Nights)</Typography>
                </Box>
                <Button variant='contained'
                  sx={{
                    textTransform: 'capitalize',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    width: '100%',
                    marginTop: '15px'
                  }}
                  onClick={handleReserve}
                >Reserve or Book Now!</Button>
              </Box>
            </Box>
          </Container>
          <Box>
            <MailList />
          </Box>
          {imageOpen && (

            <Box>
              <ShowImages setImageOpen={setImageOpen} imageOpen={imageOpen} slideIndex={slideIndex} data={hotelDetail.hotel} />
            </Box>
          )}
          {openModal && (
            <Reserve hotelId={hotelDetail.hotel._id} openModal={openModal} setOpenModal={setOpenModal} />
          )}
          
          {isDates && (
            <SelectDates isDates={isDates} setIsDates={setIsDates}/>
          )}
          
        </>
      )}


    </StyledBox>


  )
}

export default HotelDetails