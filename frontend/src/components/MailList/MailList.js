import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { StyledMail } from './style'

const MailList = () => {
  return (
    <StyledMail>
        <Typography color='white' fontSize={'30px'} fontWeight='bold'>Save time, save money!</Typography>
        <Typography color='#757575' fontSize={'20px'} lineHeight='3px'>Sign up and we'll send the best deals to you</Typography>
        <Box marginTop={'1rem'} display='flex' gap ='10px'>
        <TextField
                id="input-with-icon-textfield"
                placeholder='Your Email'
                className='input-con'
                InputProps={{

                disableUnderline: true,
                  style: {
                    fontSize: 20, 
                  }
                }}
                variant="standard"

              />
              <Button variant='contained'
              sx={{
                textTransform : 'capitalize',
                borderRadius : '5px'
              }}
              >
                Subscribe
              </Button>
        </Box>
    </StyledMail>
  )
}

export default MailList