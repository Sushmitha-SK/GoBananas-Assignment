import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Posts from '../components/Posts'
import '../styles/Home.css'

const Home = () => {
    return (
        <> <div className="App">
            <AppBar className='appBar' position="static" sx={{ backgroundColor: '#E8F3F3' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ fontFamily: 'Noto Sans', color: '#333333' }}>
                        GoBananas Assignment
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box className='hero'>
                <Box>Posts</Box>
            </Box>
            <Container maxWidth="lg" className='blogsContainer'>
                <Posts />
            </Container>
        </div>
        </>
    )
}

export default Home