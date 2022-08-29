import React, { useContext } from 'react'
import { StyledBox } from './style'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useCountByCityQuery } from '../../services/hotelsApi'
import { useNavigate } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'
import fsd from '../../assets/fsd.jpg'
import lhr from '../../assets/lhr.jpg'
import khi from '../../assets/khi.jpg'

const Featured = () => {

  const context = useContext(StatesContext)
  const { setdestination } = context
  const { data, isFetching } = useCountByCityQuery()
  const navigate = useNavigate()

  const  handleNavigate = (value)=>{

    if(value === 'Faisalabad'){
      setdestination(value)
      navigate('/hotels')
    }

    if(value === 'Karachi'){
      setdestination(value)
      navigate('/hotels')
    }

    if(value === 'Lahore'){
      setdestination(value)
      navigate('/hotels')
    }


  }

  return (
    <>
      {isFetching ?
        <Box display='flex' justifyContent={'center'}>
          <CircularProgress size={'large'}/>
        </Box> : (
          <StyledBox>

            <Box className='img-con' flex={{ md: 1 }} onClick={()=> handleNavigate('Faisalabad')}>
              <Box component='img' src={fsd} height='100%' width='100%' />
              <Box className='img-text'>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>Faisalabad</Typography>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>{data.list[0]} Properties</Typography>
              </Box>
            </Box>

            <Box className='img-con' flex={{ md: 1 }} onClick={()=> handleNavigate('Karachi')}>
              <Box component='img' src={lhr} height='100%' width='100%' />
              <Box className='img-text'>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>Karachi</Typography>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>{data.list[1]} Properties</Typography>
              </Box>
            </Box>

            <Box className='img-con' flex={{ md: 1 }} onClick={()=> handleNavigate('Lahore')}>
              <Box component='img' src={khi} height='100%' width='100%' />
              <Box className='img-text'>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>Lahore</Typography>
                <Typography color='white' fontWeight={'bold'} fontSize='35px'>{data.list[2]} Properties</Typography>
              </Box>
            </Box>


          </StyledBox>
        )}
    </>
  )
}

export default Featured