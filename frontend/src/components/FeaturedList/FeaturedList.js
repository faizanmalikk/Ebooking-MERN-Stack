import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img from '../../assets/ok.jpg'
import img2 from '../../assets/img2.jpg'
import { StyledContainer } from './style'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useGetFeaturedHotelsQuery } from '../../services/hotelsApi'
import { useNavigate } from 'react-router-dom'



const FeaturedList = () => {

    const smallerthen1500 = useMediaQuery('(max-width:1500px)')
    const smallerthen1200 = useMediaQuery('(max-width:1200px)')
    const smallerthen900 = useMediaQuery('(max-width:900px)')
    const smallerthen600 = useMediaQuery('(max-width:600px)')

    const [perview, setpreview] = useState(5)

    let featured = true
    const navigate = useNavigate()
   
    const { data, isFetching } = useGetFeaturedHotelsQuery(featured)

    useEffect(() => {

        if (smallerthen1500) {
            setpreview(4)
        }
        if (smallerthen1200) {
            setpreview(3)
        }
        if (smallerthen900) {
            setpreview(2)
        }
        if (smallerthen600) {
            setpreview(1)
        }

    }, [])


    return (
        <>
            {isFetching ? (

                <Box display='flex' justifyContent={'center'}>
                    <CircularProgress size={'large'} />
                </Box>
            ) : (
                  
                 <StyledContainer>

                    <Swiper
                        slidesPerView={perview}
                        spaceBetween={30}
                        modules={[Navigation, Pagination]}
                        navigation={true}
                        style={{
                            "--swiper-navigation-size": "25px",
                        }}
                    >
                        {data.hotel.map((item, i) => (
                            <SwiperSlide key={i} className='container' >
                                <Box display={'flex'} flexDirection='column' gap='5px' onClick={() => navigate(`/hotel/${item._id}`)} sx={{cursor : 'pointer'}}>
                                    <Box component='img' src={item.images[0].url} height='350px' width='100%' />
                                    <Typography fontWeight={'bold'} fontSize='23px'>{item.title.length > 22 ? `${item.title.slice(0, 22)}...` : item.title}</Typography>
                                    <Typography color='#757575' fontSize={'19px'}>{item.city}</Typography>
                                    <Typography fontWeight={'bold'} fontSize={'19px'}>Starts from ${item.cheapestPrice}</Typography>
                                   {item.ratings && (

                                    <Box display={'flex'} gap='15px' alignItems={'center'}>
                                        <Typography className='rating'>{item.ratings}</Typography>
                                        <Typography fontSize={'19px'}>Excellent</Typography>
                                    </Box>
                                   )}
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </StyledContainer>
            )}
        </>
    )
}

export default FeaturedList