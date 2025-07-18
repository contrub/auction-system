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

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = (e) => {
        e.preventDefault();
        AuthService.login(formData)
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
                        variant="outlined"
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
                        variant="outlined"
                        sx={styles.passwordInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button onClick={handleLoginClick} fullWidth size="large" variant="contained" sx={styles.button}>
                        Login
                    </Button>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography variant="body2" color="textSecondary">
                            Not registered?&nbsp;
                            <Link to={paths.signup} style={styles.linkText}>Sign up</Link>
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
}

export default Login;
