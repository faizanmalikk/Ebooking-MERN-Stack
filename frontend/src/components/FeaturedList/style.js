import { Box, styled } from "@mui/material";


const StyledContainer = styled(Box)(({ theme }) => ({
position : 'relative',
'.rating':{
    fontSize : '16px',
    backgroundColor : theme.palette.info.dark,
    color : 'white',
    padding : '5px',
    objectFit : 'cover',
    borderRadius : '5px'
},
 '.swiper-button-prev , .swiper-button-next':{
     color : 'black',
     backgroundColor : theme.palette.grey[400],
     height : '55px',
     width : '55px',
     borderRadius : '50%',
     size : '10px',
     transition : 'all 0.4s ease-in-out',
    position : 'absolute',
    top :'170px',
     '&:hover':{
        backgroundColor : theme.palette.grey[300],

     }
 },
 '.container':{
    display : 'flex',
    justifyContent : 'center'
 }
}))

export {
    StyledContainer
}