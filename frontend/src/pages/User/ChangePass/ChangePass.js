import React, { useState, useEffect } from 'react'
import { Lock, LockOpen, VpnKey } from '@mui/icons-material'
import { Box, Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StyledBoxUpdate, FormContainerUpdate, FormHeadingUpdate } from './style'
import { useUpdateUserPassMutation } from '../../../services/userApi'


const ChangePass = () => {


    const [oldPass, setOldPass] = useState()
    const [newpass, setNewpass] = useState()
    const [confirmPass, setConfirmPass] = useState()

    const [updatePass, response] = useUpdateUserPassMutation()

    const navigate = useNavigate()

    const updateSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("oldPassword", oldPass);
        myForm.set("newPassword", newpass);
        myForm.set("confirmPassword", confirmPass);

        updatePass(myForm)


    }

    useEffect(() => {

        if (response.status === 'fulfilled') {

            navigate('/me')

        }
    }, [response])



    return (
        <>
            <StyledBoxUpdate>
                <FormContainerUpdate>
                    <FormHeadingUpdate>Change Password</FormHeadingUpdate>
                    <Box component={'form'} encType='multipart/form-data' onSubmit={updateSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                        <TextField
                            label="Old Password"
                            name='Old Password'
                            variant="standard"
                            type='password'
                            className='email-feild'
                            required
                            onChange={(e) => setOldPass(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKey />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    fontSize: 20,
                                    marginTop: '10px'
                                }
                            }} />
                        <TextField
                            label="New Password"
                            name='New Password'
                            variant="standard"
                            type='password'
                            className='email-feild'
                            onChange={(e) => setNewpass(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    fontSize: 20,
                                    marginTop: '10px'
                                }
                            }} />

                        <TextField
                            label="Confirm Password"
                            name='Confirm Password'
                            variant="standard"
                            type='password'
                            className='email-feild'
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    fontSize: 20,
                                    marginTop: '10px'
                                }
                            }} />

                        {response.error && (
                            <Typography fontSize={'20px'}  color='red' >{response.error.data.message}</Typography>
                        )}


                        <Button variant="contained" type='submit' sx={{ width: '100%', borderRadius: '25px' }}>
                            {response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Update'}
                        </Button>

                    </Box>
                </FormContainerUpdate>
            </StyledBoxUpdate>

        </>
    )
}

export default ChangePass