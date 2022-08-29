import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

    display:'flex',
    gap : '10px',
    padding : '10px',
    border : '1px solid #9e9e9e',
    borderRadius : '10px',
    marginBottom : '1rem',
    [theme.breakpoints.down('md')]:{
        flexDirection : 'column'
    },

    '.title':{
        fontSize : '18px',
        color : 'white',
        backgroundColor : 'green',
        width : 'max-content',
        padding : '5px',
        borderRadius : '8px',
        marginTop : '10px'
    },

    '.rating':{
        fontSize : '16px',
        backgroundColor : theme.palette.info.dark,
        color : 'white',
        padding : '5px',
        objectFit : 'cover',
        borderRadius : '5px'
    },


}))

export {
    StyledBox
}