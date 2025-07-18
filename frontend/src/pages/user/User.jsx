import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths.js';
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import UserService from '../../services/user/UserService';

const User = () => {
    const { userID } = useParams();
    const [formData, setFormData] = useState({
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        balance: 0
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUser({ id: userID })
            .then((data) => setFormData(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [userID]);

    const handleInputChange = handleFieldChange(setFormData);

    const handleSaveClick = async () => {
        try {
            await UserService.updateUser(formData);
            setError('');
            navigate(paths.users);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    // const handleDeleteClick = async () => {
    //     try {
    //         await UserService.deleteUser({ id: userID });
    //         setError('');
    //         navigate(paths.users);
    //     } catch (err) {
    //         const errorMessage = extractErrorMessage(err);
    //         setError(errorMessage);
    //         setSnackbarOpen(true);
    //     }
    // };

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <AccountCircleIcon sx={styles.avatarIcon} />
                </Avatar>
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
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
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
                </form>
                <div style={styles.flexCenter}>
                    <Button
                        sx={styles.saveButton}
                        variant="contained"
                        color="primary"
                        onClick={handleSaveClick}
                    >
                        Save
                    </Button>
                    {/*<Button*/}
                    {/*    sx={styles.deleteButton}*/}
                    {/*    variant="contained"*/}
                    {/*    color="error"*/}
                    {/*    onClick={handleDeleteClick}*/}
                    {/*>*/}
                    {/*    Remove*/}
                    {/*</Button>*/}
                </div>
                <ErrorSnackbar
                    open={snackbarOpen}
                    message={error}
                    onClose={() => setSnackbarOpen(false)}
                />
            </Grid>
        </Grid>
    );
}

export default User;