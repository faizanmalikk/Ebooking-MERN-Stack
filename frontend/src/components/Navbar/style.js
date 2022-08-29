import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    padding: '10px 0',
    '.nav-btn': {
        color: 'black',
        textTransform: 'capitalize',
        backgroundColor: 'white',
        fontSize: '15px',
        borderRadius: '5px',
        transition: 'all 0.4s ease-in-out',
        padding: '10px',
        '&:hover': {
            backgroundColor: theme.palette.grey[200]
        }
    },
    '.unactive-link': {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.grey[300],
        gap: '10px',
        textTransform: 'capitalize',
        padding: '10px',
        transition: 'all 0.4s ease-in-out',
        '&:hover': {
            color: 'white'
        }
    },
    '.active-link': {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '10px',
        textTransform: 'capitalize',
        border: '1px solid white',
        padding: '10px',
        borderRadius: '20px'
    },
 

}))

export {
    StyledBox
}