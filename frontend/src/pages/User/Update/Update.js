import React, { useContext, useState, useEffect } from 'react'
import { Face, MailOutline } from '@mui/icons-material'
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import StatesContext from '../../../context/StatesContext'
import { InputFileUpdate, StyledBoxUpdate, FormContainerUpdate, FormHeadingUpdate } from './style'
import { useUpdateUserMutation } from '../../../services/userApi'


const UpdateUser = () => {

    const context = useContext(StatesContext)
    const { userInfo, setUserInfo } = context

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [avatar, setavatar] = useState()
    const [avatarPreview, setavatarPreview] = useState()

    const [updateUser, response] = useUpdateUserMutation()

    const navigate = useNavigate()

    const handleUpdateChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatar(reader.result)
                    setavatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }

    }

    const updateSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        { avatar && myForm.set("avatar", avatar) }

        updateUser(myForm)

    }


    useEffect(() => {
        if (userInfo) {

            setname(userInfo.name)
            setavatarPreview(userInfo.avatar.url)
            setemail(userInfo.email)
        }

    }, [userInfo])

    useEffect(() => {

        if (response.status === 'fulfilled') {

            setUserInfo(response.data.user)
            navigate('/me')

        }
    }, [response])



    return (
        <>
            <StyledBoxUpdate>
                <FormContainerUpdate>
                    <FormHeadingUpdate>Update Profile</FormHeadingUpdate>
                    <Box component={'form'} encType='multipart/form-data' onSubmit={updateSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                        <TextField
                            label="Name"
                            name='name'
                            variant="standard"
                            className='email-feild'
                            value={name}
                            required
                            onChange={(e) => setname(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Face />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    fontSize: 20,
                                    marginTop: '10px'
                                }
                            }} />
                        <TextField
                            label="Email"
                            name='email'
                            variant="standard"
                            value={email}
                            className='email-feild'
                            onChange={(e) => setemail(e.target.value)}
                            type={'email'}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Face />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    fontSize: 20,
                                    marginTop: '10px'
                                }
                            }} />

                        <Box display={'flex'} alignItems='center' paddingLeft={'5px'}>
                            <Box component={'img'} src={avatarPreview} width='55px' marginRight={'20px'}></Box>
                            <InputFileUpdate
                                component={'input'}
                                label="avatar"
                                name='avatar'
                                accept='image/*'
                                onChange={handleUpdateChange}
                                type={'file'}
                            ></InputFileUpdate>

                        </Box>

                        <Button variant="contained" type='submit' sx={{ marginTop: '20px', width: '100%', borderRadius: '25px' }}>
                            {response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Update'}
                        </Button>

                    </Box>
                </FormContainerUpdate>
            </StyledBoxUpdate>

        </>
    )
}

export default UpdateUser