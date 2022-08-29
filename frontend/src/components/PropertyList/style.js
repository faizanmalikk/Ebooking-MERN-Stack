import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    display: 'flex',
    gap: '10px',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
        height : 'auto'
    },
    '.img-con': {
        height: '300px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        cursor: 'pointer',

        [theme.breakpoints.down('md')]: {
            width: '400px',
            height: '400px',
        }
    },
}))

export {
    StyledBox
}