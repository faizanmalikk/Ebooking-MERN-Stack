import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '15px',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
    },

    '.search-con': {
        backgroundColor: theme.palette.warning.light,
        padding: '10px',
        borderRadius: '10px',
        position: 'sticky',
        top: '15px',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        [theme.breakpoints.down('lg')]: {
            position: 'relative',
            width: '50%'
        },
        [theme.breakpoints.down('md')]: {
            width: '60%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },

    '.search-input': {
        borderRadius: '10px',
        backgroundColor: 'white',
        width: '100%',
        padding: '5px 10px'
    },

    '.date': {
        position: 'absolute',
        top: '60px',
        zIndex: '1',
        [theme.breakpoints.down('sm')]: {

            width: '100%',
            overflow: 'auto'
        }
    },
    '.calender': {
        [theme.breakpoints.down('sm')]: {

            width: '100%',
            overflow: 'auto'
        }
    },

    '.date-con': {
        color: '#757575',
        fontSize: '19px',
        cursor: 'pointer',
        transition: 'all 0.4s ease-in-out',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '10px',
        '&:hover': {
            color: 'black'
        },
        [theme.breakpoints.down('sm')]: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        }
    },

    '.search-option': {
        borderRadius: '10px',
        backgroundColor: 'white',
        width: '3.3rem',
        padding: '5px 10px'
    },
}))

export {
    StyledBox
}