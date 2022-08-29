import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Header, Navbar, Featured, PropertyList, FeaturedList, MailList } from '../../components'

const Home = () => {
  return (
    <Box >
      <Navbar />
      <Header />
      <Container maxWidth='xl' sx={{ marginTop: { xs: '300px', md: '4rem' } }}>
        <Featured />
        <Box sx={{marginTop : '2rem'}}>
          <Typography textAlign={{xs:'center',md:'unset'}} fontWeight={'bold'} fontSize='25px' margin={'1rem 0'}>Browse by property type</Typography>
          <PropertyList/>
        </Box>
        <Box sx={{marginTop : '2rem'}}>
          <Typography textAlign={{xs:'center',md:'unset'}} fontWeight={'bold'} fontSize='25px' margin={'1rem 0'}>Home guests love</Typography>
          <FeaturedList/>
        </Box>
      </Container>
      <MailList/>
    </Box>
  )
}

export default Home