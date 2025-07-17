import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom';

import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';

import Cookies from 'js-cookie';

import {styles} from '../styles/components/navBarStyles';
import paths from '../routes/paths.js';
import {accessControl} from '../utils/accessControl';
import {extractErrorMessage} from '../utils/errorUtils';
import ErrorSnackbar from './ErrorSnackbar';
import AuthService from '../services/auth/AuthService';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        if (pathname === '/login' || pathname === '/signup')
            return;

        AuthService.getRole()
            .then((res) => setUserRoles(res.roles || []))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [pathname]);
 
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const isAuthenticated = () => Boolean(Cookies.get("accessToken"));

    const logout = () => {
        AuthService.logout()
            .then(() => {
                Cookies.remove("accessToken");
                navigate(paths.login)
            })
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    };

    const renderAuthLinks = () => {
        return (
            <Typography variant="subtitle1" component="span">
                {isAuthenticated() ? (
                    <Link to={paths.home} style={styles.navbarLink} onClick={logout}>Logout</Link>
                ) : (
                    <Link to={paths.login} style={styles.navbarLink}>Login</Link>
                )}
            </Typography>
        )
    }

    const NavLinkItem = ({ to, icon, label }) => (
        <ListItem button component={Link} to={to}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    );

    const DrawerList = (
        <Box
            sx={styles.drawer}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                { accessControl(userRoles, ['participant', 'recruiter', 'admin']) && (
                    <NavLinkItem to={paths.auctions} icon={<PeopleIcon />} label="Auctions" />
                )}
                { accessControl(userRoles, ['recruiter', 'admin']) && (
                    <NavLinkItem to={paths.categories} icon={<PeopleIcon />} label="Categories" />
                )}
                { accessControl(userRoles, ['admin']) && (
                    <>
                        <NavLinkItem to={paths.users} icon={<PeopleIcon />} label="Users" />
                        <NavLinkItem to={paths.stats} icon={<PeopleIcon />} label="Stats" />
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
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
            <ErrorSnackbar
                open={snackbarOpen}
                message={error}
            />
        </AppBar>
    );
}

export default Navbar;
