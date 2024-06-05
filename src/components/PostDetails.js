import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrievePostsByID } from "../api/postApi";
import CircularProgress from '@mui/material/CircularProgress';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await retrievePostsByID(id);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    }, [id]);

    if (!post) {
        return (

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>

        );
    }
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#E8F3F3' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Noto Sans', color: '#333333' }}>
                        GoBananas Assignment
                    </Typography>
                    <Link
                        to="/"
                        color="inherit"
                        underline="none"
                        sx={{ fontFamily: 'Noto Sans', color: '#333', textDecoration: 'none' }}
                    >
                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Noto Sans', color: '#333', textDecoration: 'none', fontSize: '14px' }}>
                            ← Back
                        </Typography>

                    </Link>
                </Toolbar>
            </AppBar>

            <Box>
                <Box sx={{ padding: '20px', background: '#f5f5f5' }}>
                    <Typography align="center" variant="h4" sx={{ fontWeight: 700, fontFamily: 'Noto Sans' }}>
                        {post.title}
                    </Typography>
                </Box>
                <Container sx={{ padding: '20px' }}>
                    <Typography align="justify" variant="body1" sx={{ fontWeight: 600, fontFamily: 'Noto Sans' }}>
                        {post.body}
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default PostDetails;
