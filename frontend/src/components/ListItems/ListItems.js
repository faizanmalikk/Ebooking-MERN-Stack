import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { StyledBox } from './style'
import { useNavigate } from 'react-router-dom'


const ListItems = ({ data }) => {

  const navigate = useNavigate()

  return (
    <StyledBox>
      <Box flex={{ md: '3' }}>
        <Box display='flex' gap='10px' flexDirection={{ xs: 'column', md: 'row' }}>
          <Box component={'img'} src={data.images[0].url} height='300px' width={{ xs: '100%', md: '280px' }} />
          <Box>
            <Typography color='#1565c0' fontSize={{ xs: '25px', sm: '35px' }} fontWeight='bold'>{data.name}</Typography>
            <Typography fontSize={'20px'} color='#757575'>{data.distance} from center</Typography>
            <Typography className='title'>Free Airport Taxi</Typography>
            <Typography fontWeight={'bold'} fontSize='18px' sx={{ marginTop: '13px' }}>Studio apartment with air condionting</Typography>
            <Typography fontSize='19px' sx={{ marginTop: '10px' }}>
              {data.desc.length > 50 ? `${data.desc.slice(0,50)}...` : data.desc}
            </Typography>
            <Typography fontSize='21px' color='green' fontWeight='bold' sx={{ marginTop: '10px' }}>Free Cancellation</Typography>
            <Typography fontSize='19px' color='green' sx={{ marginTop: '10px' }}>You can cancel later, so lock in this great price today! </Typography>
          </Box>
        </Box>
      </Box>
      <Box flex={{ md: '1' }} display='flex' justifyContent={'space-between'} flexDirection='column'>
        {data.ratings ? (
          <Box display='flex' justifyContent={'space-between'}>
            <Typography>Excellent</Typography>
            <Typography className='rating'>{data.ratings}</Typography>
          </Box>
        ) : (
          <Box></Box>
        )}
        <Box display='flex' flexDirection={'column'} justifyContent='flex-end'>
          <Typography textAlign={'right'} fontSize='35px' fontWeight={'bold'}>{data.cheapestPrice}$</Typography>
          <Typography fontSize={'18px'} textAlign={'right'} color='#757575'>Includes taxes and fees</Typography>
          <Button variant='contained' sx={{ width: '100%', marginTop: '10px' }} onClick={() => navigate(`/hotel/${data._id}`, { replace: true })}>See Availability</Button>
        </Box>
      </Box>
    </StyledBox>
  )
}

export default ListItems