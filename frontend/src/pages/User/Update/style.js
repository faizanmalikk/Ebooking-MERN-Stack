import { Box, styled, Typography } from "@mui/material";

const StyledBoxUpdate = styled(Box)(({ theme }) => ({

    padding: '2.5em 0',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
        margin: '1em 0'
    },

    '.email-feild': {

        width: '100%',
        border: '1px solid #e0e0e0',
        padding: '9px 18px',
        paddingTop: '0',
        borderRadius: '25px',
        backgroundColor: '#f2f7fb',
        transition: 'all 0.4s ease-in-out',
        '&:hover': {
            boxShadow: '0 0 20px #f2f7fb'
        },
        position: 'relative',

        '.MuiFormLabel-root': {
            marginTop: '-30px'
        }
    },


}))

const FormHeadingUpdate = styled(Typography)(({ theme }) => ({

    fontSize: '30px',
    paddingTop: '19px',
    borderBottom: '1px solid rgba(0,0,0,0.216)',
    fontFamily: 'Roboto',
    cursor: 'pointer',
    color: theme.palette.grey[700],
    paddingBottom: '10px',
    margin: '0 80px',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
        margin: '0 40px'
    }

}))

const FormContainerUpdate = styled(Box)(({ theme }) => ({
    margin: 'auto',
    width: '50vh',
    backgroundColor: 'white',
    height: 'auto',

    [theme.breakpoints.down('sm')]: {
        width: '90%',
        height: 'auto'
    }


}))

const InputFileUpdate = styled(Box)({
    '&::file-selector-button': {
        cursor: 'pointer',
        width: '100%',
        padding: '0 1vmax',
        height: '5vh',
        borderColor: 'rgba(0,0,0,0.116)',
        color: 'rgba(0,0,0,0.616)',
        backgroundColor: 'white',
        transition: 'all 0.5s',
        font: '400 1em Roboto',
        borderRadius : '25px'
    },

    '&::file-selector-button:hover': {
        backgroundColor: 'rgb(235,235,235)'
    }

})

export {
    InputFileUpdate,
    StyledBoxUpdate,
    FormContainerUpdate,
    FormHeadingUpdate
}

