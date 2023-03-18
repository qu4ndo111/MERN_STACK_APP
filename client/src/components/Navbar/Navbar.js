import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/logo.jpg';
import text from '../../images/text.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState();
    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }


       setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        
        history.push('/');

        setUser(null);
    }

    return (
        <AppBar position='static' color='inherit' className={classes.appBar}>
            <Link className={classes.brandContainer} to={'/'}>
                <img 
                    alt='icon'
                    height='45'
                    src={text} 
                />
                <img
                    className={classes.image}
                    src={memories}
                    alt='QuanAMemories'
                    height='40'
                />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            component={Link}
                            to={`/user/${user?.result?._id}`}
                            className={classes.purple}
                            alt={user?.result.name}
                            src={user?.result.picture}
                        >
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user?.result.name}
                        </Typography>
                        <Button variant='contained' onClick={logout} color='secondary'>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar