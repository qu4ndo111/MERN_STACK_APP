import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Avatar, Grid, Grow, AppBar, Button, Container, Paper } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';

import useStyle from './styles'
import Posts from '../Posts/Posts';
import { profile } from '../../actions/auth'

const Profile = () => {
    const userId = useParams();
    const classes = useStyle();
    const dispatch = useDispatch();

    const [saveImage, setSaveImage] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        baseURL: '',
    });
    const [coverImage, setCoverImage] = useState({
        file: null,
        baseURL: '',
    });

    const { result: currentUser } = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(profile(userId.id));
    }, [userId.id])

    const { profile: userProfile } = useSelector((state) => state.auth);

    const getBase64 = async (file) => {
        return new Promise((resolve) => {
            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const baseURL = reader.result;
                resolve(baseURL);
            }
        })
    }

    const handleChangeAvatar = (e) => {
        e.persist()

        getBase64(e.target.files[0])
        .then((data) => {
            setAvatar({file: e.target.files[0], baseURL: data})
        })
    }

    const handleChangeCoverImage = (e) => {
        e.persist()

        getBase64(e.target.files[0])
        .then((data) => {
            setCoverImage({file: e.target.files[0], baseURL: data})
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
                            <form onSubmit={handleSubmit}>
                                <div className={classes.profileContainer}>
                                    <img
                                        src={coverImage?.file ? URL.createObjectURL(coverImage?.file) : 'https://cdn.donmai.us/sample/7a/56/__shirakami_fubuki_sukonbu_fubuzilla_and_fubuchun_hololive_drawn_by_karohroka__sample-7a56b7287c3a4f5f3d6915fe3a034e70.jpg'}
                                        className={classes.profileImage}
                                        alt={"Cover"}
                                    />
                                    {
                                        currentUser?._id === userProfile?.id && (
                                            <label htmlFor='background-upload' className={classes.editIcon}>
                                                <input
                                                        type='file'
                                                        id='background-upload'
                                                        accept="image/*"
                                                        onChange={handleChangeCoverImage}
                                                        style={{ display: 'none' }}
                                                    />
                                                <EditIcon />
                                            </label>
                                        )
                                    }
                                    <div className={classes.avatarContainer}>
                                        <Avatar
                                            className={classes.avatar}
                                            sizes="150px"
                                            alt={userProfile?.name}
                                            src={avatar?.file && URL.createObjectURL(avatar?.file)}
                                        />
                                        {
                                            currentUser?._id === userProfile?.id && (
                                                <label htmlFor='image-upload' className={classes.editAvatar}>
                                                    <input
                                                        type='file'
                                                        id='image-upload'
                                                        accept="image/*"
                                                        onChange={handleChangeAvatar}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <CameraAltIcon fontSize="small" />
                                                </label>
                                            )
                                        }
                                    </div>
                                    {
                                        saveImage && (
                                            <div className={classes.submitButton}>
                                                <Typography variant='h6'>Do you want to upload image ?</Typography>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '20px',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Button variant='contained' type='button' color='secondary'>Cancel</Button>
                                                    <Button variant='contained' type='submit' color='primary'>Save</Button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                            <Typography variant='h3' align='center' style={{ margin: '10px 0' }}>{userProfile?.name}</Typography>
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