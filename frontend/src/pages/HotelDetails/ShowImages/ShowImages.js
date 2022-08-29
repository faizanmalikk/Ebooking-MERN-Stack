import React from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

import { StyledBox } from './style';


const ShowImages = ({ setImageOpen, slideIndex , data}) => {
    return (
        <StyledBox>
            <Box height={{xs:'25vh',sm:'15vh'}} sx={{backgroundColor:'black',opacity : '0.6'}} onClick={()=>setImageOpen(false)}></Box>
        <Box  padding='0 10%' backgroundColor='black' height={{xs:'50vh',sm:'70vh'}}>
              <Swiper
            
                spaceBetween={30}
                modules={[Navigation]}
                navigation={true}
                style={{
                    "--swiper-navigation-size": "25px",
                }}
                initialSlide={slideIndex}
            >
                {data.images.map((item, i) => (
                    <SwiperSlide key={i} >
                    <Box component={'img'} src={item.url} key={i} width='100%' height={{xs:'50vh',sm:'70vh'}}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            </Box>
            <Box height={{xs:'25vh',sm:'15vh'}}  sx={{backgroundColor:'black',opacity : '0.6'}} onClick={()=>setImageOpen(false)}></Box>
            </StyledBox>
    )
}

export default ShowImages