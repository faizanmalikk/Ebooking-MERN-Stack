import { Cancel } from '@mui/icons-material'
import { Box, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import { StyledBox } from './style'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import StatesContext from '../../../context/StatesContext'

const SelectDates = ({ isDates, setIsDates }) => {

    const context = useContext(StatesContext)
    const { dates, setDates } = context

    const fullScreen = useMediaQuery('(max-width:550px)')

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isDates}
            onClose={() => setIsDates(false)}
            aria-labelledby="responsive-dialog-title"
            PaperProps={!fullScreen && { sx: { width: { md: '20rem' } } }}

        >
            <StyledBox>
                <Box display={'flex'} justifyContent='flex-end'>
                    <IconButton className='cancel-icon' onClick={() => setIsDates(false)}>
                        <Cancel />
                    </IconButton>
                </Box>
                <Typography fontSize={'25px'} margin='1rem 0' fontWeight='bold'>Please select an date and try again</Typography>
                <Box display='flex' justifyContent={'center'}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className='calender'
                        minDate={new Date()}
                       
                    />
                </Box>
            </StyledBox>
        </Dialog>
    )
}

export default SelectDates