
import { Cancel } from '@mui/icons-material';
import { Box, Button, Checkbox, CircularProgress, Dialog, FormControlLabel, FormGroup, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import StatesContext from '../../context/StatesContext';
import { useGetHotelRoomsQuery, useUpdateRoomStatusMutation } from '../../services/hotelsApi';
import { StyledReserve } from './style';

const Reserve = ({ hotelId, openModal, setOpenModal }) => {

    const fullScreen = useMediaQuery('(max-width:550px)')
    const [seletedValue, setseletedValue] = useState([])

    const context = useContext(StatesContext)
    const { dates } = context

    const { data, isFetching, refetch } = useGetHotelRoomsQuery(hotelId)
    const [updateRoom, response] = useUpdateRoomStatusMutation()


    const handleSelect = (e) => {

        const checked = e.target.checked
        const value = e.target.value

        setseletedValue(
            checked ? [...seletedValue, value] : seletedValue.filter((item) => item !== value)
        )

    }

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleReserve = async () => {

        await Promise.all(
            seletedValue.map((roomId) => {
                updateRoom({ roomId, alldates })
            })
        )
        setOpenModal(false)
        refetch()
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="responsive-dialog-title"
                PaperProps={!fullScreen && { sx: { width: { md: '27rem' } } }}

            >
                <StyledReserve>
                    <Box display={'flex'} justifyContent='flex-end'>
                        <IconButton className='cancel-icon' onClick={() => setOpenModal(false)}>
                            <Cancel />
                        </IconButton>
                    </Box>

                    <Box>
                        <Typography fontSize={'25px'}>Select Your Rooms:</Typography>
                        {isFetching ? (
                            <Box display='flex' justifyContent={'center'} alignItems='center' height='40vh'>
                                <CircularProgress size={50} />
                            </Box>
                        ) : (
                            <Box padding='1rem' display='flex' flexDirection={'column'} gap='1rem'>
                                {data.list.length ? data.list.map((item, i) => (
                                    <>
                                        <Box key={i} display='flex' gap='1rem' justifyContent={'space-between'}>
                                            <Box>
                                                <Typography fontSize='28px' fontWeight={'bold'}>{item.title}</Typography>
                                                <Typography fontSize='21px' color='#757575' lineHeight={'19px'}>{item.desc}</Typography>
                                                <Box display={'flex'} sx={{ marginTop: '5px' }}>
                                                    <Typography fontSize={'18px'}>Max People:</Typography>
                                                    <Typography fontSize={'18px'} fontWeight='bold'>{item.maxPeople}</Typography>
                                                </Box>
                                                <Typography fontSize='22px' fontWeight={'bold'} >${item.price}</Typography>
                                            </Box>
                                            <Box display='flex' flexWrap={'wrap'}>
                                                {item.roomNumbers.map((item, i) => (

                                                    <FormGroup key={i} onClick={(e) => handleSelect(e)} >
                                                        <FormControlLabel disabled={!isAvailable(item)} value={item._id.toString()} control={<Checkbox sx={{ fontSize: '10px' }} />} label={item.number} />
                                                    </FormGroup>
                                                ))}
                                            </Box>
                                        </Box>
                                        <Button
                                            variant='contained'
                                            sx={{ textTransform: 'capitalize', width: '100%' }}
                                            onClick={() => handleReserve()}
                                        >
                                            {response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Reserve Now'}
                                        </Button>
                                    </>
                                )) : (
                                    <Typography fontWeight={'bold'} textAlign='center' >No rooms are availabe right now!</Typography>
                                )}

                            </Box>
                        )}
                    </Box>

                </StyledReserve>

            </Dialog>
        </>
    )
}

export default Reserve