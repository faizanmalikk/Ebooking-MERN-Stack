import { Box, styled } from "@mui/material";


const StyledProfile = styled(Box)(({ theme }) => ({

    '.cancel-icon': {
        color: 'black',
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }
    },
    '.btn': {
        color: 'white',
        borderRadius: '10px'
    },

    '.profile-con': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem 0',
        padding : '15px',
        transition : 'all 0.4s ease-in-out',
        borderRadius : '20px',
        '&:hover':{
            backgroundColor : theme.palette.grey[200],
            cursor : 'pointer'
        }
    }
}))



export {

    StyledProfile

}