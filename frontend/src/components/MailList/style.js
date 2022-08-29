import { Box, styled } from "@mui/material";


const StyledMail = styled(Box)(({ theme }) => ({

    marginTop: '3rem',
    backgroundColor: '#003580',
    padding: '50px 10px' ,

    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    
    '.input-con':{
        backgroundColor : 'white',
        borderRadius : '5px',
        padding : '10px 13px',
        width : '17rem',
        [theme.breakpoints.down('sm')]:{
            width : '90%'
        }
    }

}))

export {
    StyledMail
}