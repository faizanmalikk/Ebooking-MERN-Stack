import { Box, styled } from "@mui/material";


const HeaderContainer = styled(Box)(({ theme }) => ({
  
    padding: '10px 0',
    backgroundColor : theme.palette.info.dark,
    '.reg-btn': {
        color: 'black',
        backgroundColor: 'white',
        textTransform: 'unset',
        marginTop: '1rem',
        borderRadius: '10px',
        transition: 'all 0.4s ease-in-out',
        marginBottom: '5rem',
        '&:hover': {
            backgroundColor: theme.palette.grey[200]
        },
        [theme.breakpoints.down('md')]:{
            marginBottom: '0',
        }
    },
    '.search-con': {
        position: 'absolute',
        bottom: '-38px',
        left:'0',
        width: '100%',
        backgroundColor: 'white',
        border: `2px solid ${theme.palette.warning.light}`,
        height: '60px',
        display: 'flex',
        gap:'10px',
        [theme.breakpoints.down('md')]:{
            position : 'relative',
           backgroundColor : 'white',
            flexDirection : 'column',
            alignItems : 'center',
            border : 'none',
            bottom : '-105px'
    
        }

    },
    '.date': {
        position: 'absolute',
        top: '60px',
        zIndex : '1',
        [theme.breakpoints.down('sm')]:{

            width : '100%',
            overflow : 'auto'
        }
    },
    '.calender':{
        [theme.breakpoints.down('sm')]:{

            width : '100%',
            overflow : 'auto'
        }
    },
    '.date-con': {
        color: '#757575',
        fontSize: '19px',
        cursor: 'pointer',
        transition: 'all 0.4s ease-in-out',
        '&:hover': {
            color: 'black'
        },
        [theme.breakpoints.down('sm')]:{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        }
    },
    '.room-con': {
        backgroundColor: 'white',
        boxShadow: '0 0 30px rgba(0,0,0,0.1)',
        width: '14rem',
        padding: '0 10px',
        position: 'absolute',
        top: '60px',
        zIndex : '1',
        [theme.breakpoints.down('sm')]:{
            width : '100%'
        }
    },
    '.add-btn': {
        border: '1px solid blue',
        borderRadius: '0',
        height: '35px',
        width: '35px',
        color: 'blue',



    }


}))

export {
    HeaderContainer
}