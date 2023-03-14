import React, { useState } from 'react'
import { Avatar, Button, Grid, Typography, Container, Paper } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import useStyles from './styles';
import Input from './Input';
import { signup, signin } from '../../actions/auth';

const Auth = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prev) => !prev)

    const switchMode = () => {
        setIsSignUp((prev) => !prev)
        setShowPassword(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const responseGoogle = async (res) => {
        const result = jwt_decode(res.credential);
        try {
            dispatch({ type: 'AUTH', data: { result, token: res.credential } });

            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Container className={classes.googleButton}>
                        <GoogleLogin 
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </Container>
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;