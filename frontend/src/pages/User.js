import React, { useState, useEffect } from "react";

import { Button, Grid, TextField, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

import UserService from "../services/UserService";
import Loading from "../components/Loading";
import '../styles/UserStyle.css';

const redirect = () => {
    window.location.href = '/users';
}

const User = () => {
    // eslint-disable-next-line
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        balance: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        setIsLoading(true);
        const id = window.location.href.split('/')[4];
        UserService.getUser({id})
            .then((res) => {
                setUser(res);
                setFormData(res);
                setError(null);
            })
            .catch((err) => {
                setError(err.error);
            })
        setIsLoading(false);
    }, [setUser, setFormData, setError, setIsLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            await UserService.updateUser(formData);
            setUser(formData);
            setError(null);
            redirect();
        } catch (err) {
            console.error('Error updating user:', err);
            setIsLoading(false);
            setError(err.message);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await UserService.deleteUser({ id: formData.id });
            setError(null);
            redirect();
        } catch (err) {
            console.error('Error deleting user:', err);
            setIsLoading(false);
            setError(err.message);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" className="container">
            <Grid item xs={12} md={6} lg={4}>
                <div className="user-profile">
                    <Avatar
                        className="MuiAvatar-root"
                        sx={{ bgcolor: theme.palette.primary.main }}
                    >
                        <AccountCircleIcon />
                    </Avatar>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <form>
                            <TextField
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={true}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Balance"
                                name="balance"
                                type="number"
                                value={formData.balance}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            {error && <Typography color="error">{error}</Typography>}
                        </form>
                    )}
                    <div className="flex-center">
                        <Button className="MuiButton-root" onClick={handleSaveClick}>Save</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default User;
