import { Box, styled } from "@mui/material";


const LoginContainer = styled(Box)(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    minHeight: '100vh',

    '.google-btn': {
        marginTop: '1rem',
        width: '100%',
        color: 'black',
        textTransform: 'unset',
        borderColor: '#e0e0e0',
        borderRadius: '20px',
        '&:hover':{
            borderColor: '#e0e0e0',
        }
    },

    '.signtext': {
        color: '#9e9e9e',
        fontSize: '17px',
        textAlign: 'center',
        position: 'relative',
        zIndex: '999',
        backgroundColor: 'white',
        '&:after': {
            content: '""',
            border: '1px solid #e0e0e0',
            width: '27%',
            position: 'absolute',
            top: '11px',
            right: '0',
        

        },
        '&:before': {
            content: '""',
            border: '1px solid #e0e0e0',
            width: '27%',
            position: 'absolute',
            top: '11px',
            left: '0',
        

        }
    },

    '.email-feild':{

        width : '100%',
        border : '1px solid #e0e0e0',
        padding : '9px 18px',
        borderRadius : '25px',
        backgroundColor : '#f2f7fb',
        transition : 'all 0.4s ease-in-out',
        '&:hover':{
              boxShadow : '0 0 20px #f2f7fb'
        }
    },

    '.reg-link':{
        textDecoration : 'none',
        fontSize : '18px',
        color : theme.palette.primary.dark
    }



}))

export {

    LoginContainer
}