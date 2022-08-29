import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    padding : '1rem',

    '.cancel-icon': {
        color: 'black',
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }
    },

}))

export {
    StyledBox
}