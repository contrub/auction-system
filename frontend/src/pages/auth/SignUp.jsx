import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {styles} from '../../styles/authStyles';
import paths from '../../routes/paths';
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import AuthService from '../../services/auth/AuthService';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUpClick = (e) => {
        e.preventDefault();
        AuthService.signup(formData)
            .then(() => {
                setSnackbarOpen(false);
                navigate(paths.auctions);
            })
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });
    };

    const handleInputChange = handleFieldChange(setFormData);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.container}>
                <Avatar sx={styles.avatar}>
                    <AccountCircleIcon sx={{ fontSize: 40 }} />
                </Avatar>

                <form>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        sx={styles.input}
                    />
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        sx={styles.input}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        sx={styles.input}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        sx={styles.passwordInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        onClick={handleSignUpClick}
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={styles.button}
                    >
                        Sign Up
                    </Button>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography variant="body2" color="textSecondary">
                            Already registered?&nbsp;
                            <Link to={paths.login} style={styles.linkText}>
                                Login
                            </Link>
                        </Typography>
                    </Box>

                    <ErrorSnackbar
                        open={snackbarOpen}
                        message={error}
                        onClose={() => setSnackbarOpen(false)}
                    />
                </form>
            </Box>
        </Box>
    );
};

export default SignUp;
