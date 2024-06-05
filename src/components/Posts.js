import React, { useEffect, useState } from 'react';
import { retrievePosts } from '../api/postApi';
import { Container, Typography, List, ListItem, ListItemText, TextField, Pagination, CircularProgress, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await retrievePosts();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <>
            <Container style={{ margin: '2%' }}>

                <TextField
                    label="Search Posts"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        fontFamily: 'Noto Sans',
                        '& input': { color: '#00AAA1' },
                        '& fieldset': { borderColor: '#00AAA1' },
                        '&:focus': { '& fieldset': { borderColor: '#00AAA1', borderWidth: '2px' } }
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="clear search"
                                onClick={() => setSearchTerm('')}
                            >
                                <Clear />
                            </IconButton>
                        )
                    }}
                />


                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {currentPosts.length === 0 && (
                            <Typography variant="body1" style={{ fontFamily: 'Noto Sans', color: '#222222' }}>
                                No results found.
                            </Typography>
                        )}
                        <List>
                            {currentPosts.map((post) => (
                                <ListItem key={post.id} alignItems="flex-start" className="listItem">
                                    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }} sx={{ '&:visited': { color: 'purple' } }}>
                                        <ListItemText
                                            primary={post.title}
                                            secondary={post.body}
                                            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                                        />
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                fontFamily: 'Noto Sans',
                                '& .MuiPaginationItem-root': {
                                    color: '#00AAA1',
                                },
                                '& .Mui-selected': {
                                    color: '#00AAA1',
                                },
                                '& .MuiPaginationItem-page:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                },
                            }}
                        />
                    </>
                )}
            </Container >
        </>
    );
};

export default Posts;
