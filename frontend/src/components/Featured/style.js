import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '.img-con': {
        height: '300px',
        position: 'relative',
        borderRadius: '10px',
        overflow : 'hidden',
        cursor : 'pointer',
      
        [theme.breakpoints.down('md')]:{
            width : '400px',
        
        }   
    },
    '.img-text':{
        position : 'absolute',
        bottom : '50px',
        left : '10px'
    }
}))

export {
    StyledBox
}