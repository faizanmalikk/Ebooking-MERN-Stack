import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    position : 'fixed',
    height : '100vh',
    top : '0',
    left : '0',
    bottom:'0',
    right:'0',
    overflow:'hidden',
    '.swiper-button-prev , .swiper-button-next':{
        color : 'black',
        backgroundColor : theme.palette.grey[400],
        height : '55px',
        width : '55px',
        borderRadius : '50%',
        size : '10px',
        transition : 'all 0.4s ease-in-out',
        '&:hover':{
           backgroundColor : theme.palette.grey[300],
   
        }
    },

}))

export {
    StyledBox
}