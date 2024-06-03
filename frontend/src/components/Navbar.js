import React from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar, Toolbar, IconButton,
    Typography, Box, Drawer,
    List, ListItem, ListItemIcon,
    ListItemText
    } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';

import Cookies from 'js-cookie';

import '../styles/NavBarStyles.css';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const isAuthenticated = () => {
        const accessToken = Cookies.get("accessToken");
        return !!accessToken;
    }

    const logout = () => {
        Cookies.remove("accessToken");
        window.location.href = "/login";
    };

    const renderAuthLinks = () => {
        if (isAuthenticated()) {
            return (
                <Typography variant="subtitle1" component="span" className="navbar-link">
                    <Link to="/" className="navbar-link" onClick={logout}>Logout</Link>
                </Typography>
            );
        } else {
            return (
                <Box>
                    <Typography variant="subtitle1" component="span" className="navbar-link">
                        <Link to="/login" className="navbar-link">Login</Link>
                    </Typography>
                    <Typography variant="subtitle1" component="span" className="navbar-link">
                        <Link to="/signup" className="navbar-link">Signup</Link>
                    </Typography>
                </Box>
            );
        }
    }

    const DrawerList = (
        <Box
            className="drawer"
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/users">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    {renderAuthLinks()}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
