import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();

    if(!posts.length) return <CircularProgress />

    return (
       <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
            {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))
            }
       </Grid>
    )
}

export default Posts