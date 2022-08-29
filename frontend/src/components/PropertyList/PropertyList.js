import React, { useContext } from 'react'
import { StyledBox } from './style'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useCountByTypeQuery } from '../../services/hotelsApi'
import hotel from '../../assets/hotel.jpeg'
import apart from '../../assets/apartment.jpg'
import villas from '../../assets/villas.jpeg'
import cabins from '../../assets/cabins.jpeg'
import resorts from '../../assets/resorts.jpg'
import { useNavigate } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'

const images = [
    { image: hotel },
    { image: apart },
    { image: villas },
    { image: cabins },
    { image: resorts },
]

const PropertyList = () => {

    const { data, isFetching } = useCountByTypeQuery()
    const navigate = useNavigate()

    const context = useContext(StatesContext)
    const { settype } = context

    const handleClick = (value) => {
        settype(value)
        navigate('/hotels')
    }

    return (
        <>
            {isFetching ? (
                <Box display='flex' justifyContent={'center'}>
                    <CircularProgress size={'large'} />
                </Box>
            ) : (
                <StyledBox>
                    {images.map((item, i) => (

                        <Box className='img-con' key={i} onClick={() => handleClick(data[i].type)}>
                            <Box component='img' src={item.image} height='100%' width='100%' borderRadius='10px' />
                            <Box>
                                <Typography color='black' fontWeight={'bold'} fontSize='27px' textTransform={'capitalize'}>{data[i].type}</Typography>
                                <Typography color='#757575' fontSize='19px'>{data[i].count} {data[i].type}s</Typography>
                            </Box>
                        </Box>
                    ))}

                </StyledBox>
            )}
        </>
    )
}

export default PropertyList