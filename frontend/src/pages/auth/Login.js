import React from 'react';

import { Grid, TextField, Button, Typography, Avatar, IconButton, InputAdornment } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthService from "../../services/AuthService";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                usename: '',
                passwd: ''
            },
            showPassword: false,
            error: ''
        };
    }

    handleLoginClick = (e) => {
        e.preventDefault();
        AuthService.login(this.state.formData)
            .then((res) => {
                this.setState({ error: null })
                window.location.href = "/auctions"
            })
            .catch((err) => {
                this.setState({ error: err.message })
                console.log(err.message)
            })
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    handleTogglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        const { error, showPassword } = this.state;

        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '0 16px' }}>
                <Grid item xs={12} md={6} lg={4}>
                    <div className="user-profile">
                        <Avatar sx={{ bgcolor: 'primary.main', marginBottom: '16px', margin: 'auto' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <form>
                            <TextField
                                label="Username"
                                name="usename"
                                value={this.state.formData.usename}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                name="passwd"
                                type={showPassword ? 'text' : 'password'}
                                value={this.state.formData.passwd}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {error && <Typography color="error">{error}</Typography>}
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <Button onClick={this.handleLoginClick}>Login</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default Login;
