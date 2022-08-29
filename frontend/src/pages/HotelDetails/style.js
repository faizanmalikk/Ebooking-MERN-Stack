import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({
'.booking-con':{
    backgroundColor : '#ebf3ff',
    padding :'25px',
    borderRadius : '8px',
    [theme.breakpoints.down('md')]:{
        width : '70%',
        
    },
    [theme.breakpoints.down('sm')]:{
        width : '100%',
        
    }
},
}))

export {
    StyledBox
}