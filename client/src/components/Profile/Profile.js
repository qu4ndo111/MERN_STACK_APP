import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Avatar, Grid, Grow, AppBar, Button, Container } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import EditIcon from '@material-ui/icons/Edit';

import useStyle from './styles'
import Posts from '../Posts/Posts';


const Profile = () => {
    const userId = useParams();
    const classes = useStyle();

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} sm={5} md={8}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={1} md={1} />
                    <Grid item xs={12} sm={6} md={3} >
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <div className={classes.profileContainer}>
                                <img
                                    src="https://cdn.donmai.us/sample/7a/56/__shirakami_fubuki_sukonbu_fubuzilla_and_fubuchun_hololive_drawn_by_karohroka__sample-7a56b7287c3a4f5f3d6915fe3a034e70.jpg"
                                    className={classes.profileImage}
                                />
                                <label htmlFor='background-upload' className={classes.editIcon}>
                                    <input
                                        type='file'
                                        id='background-upload'
                                        accept="image/*"
                                        onChange={""}
                                        style={{ display: 'none' }}
                                    />
                                    <EditIcon />
                                </label>
                                <div className={classes.avatarContainer}>
                                    <Avatar className={classes.avatar} sizes="150px" />
                                    <label htmlFor='image-upload' className={classes.editAvatar}>
                                        <input
                                            type='file'
                                            id='image-upload'
                                            accept="image/*"
                                            onChange={""}
                                            style={{ display: 'none' }}
                                        />
                                        <CameraAltIcon fontSize="small" />
                                    </label>
                                </div>
                            </div>
                            <Typography variant='h3' align='center' style={{ margin: '10px 0' }}>Name</Typography>
                        </AppBar>
                        <div className={classes.buttonContainer}>
                            <Button variant='contained'>
                                Liked Posts
                            </Button>
                            <Button variant='contained'>
                                Uploaded Posts
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Profile