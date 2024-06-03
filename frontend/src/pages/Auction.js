import React, { useState, useEffect } from "react";

import {Button, Grid, TextField, Typography, Avatar, CircularProgress} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';

import AuctionService from "../services/AuctionService";
import '../styles/UserStyle.css';

const Auction = () => {
    // eslint-disable-next-line
    const [auction, setAuction] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const redirect = () => {
        window.location.href = '/auctions';
    }

    useEffect(() => {
        setIsLoading(true);
        const id = window.location.href.split('/')[4];
        AuctionService.getAuction({id})
            .then((res) => {
                setAuction(res);
                setFormData(res);
                setError(null);
            })
            .catch((err) => {
                setError(err.error);
            })
        setIsLoading(false);
    }, [setAuction, setFormData, setError, setIsLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            await AuctionService.updateAuction(formData);
            setAuction(formData);
            setError(null);
            redirect();
        } catch (err) {
            console.error('Error updating auction:', err);
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
                        <StoreIcon />
                    </Avatar>
                    {isLoading ? (
                        <div className="loading-box">
                            <CircularProgress/>
                        </div>
                    ) : (
                        <form>
                        <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                // disabled={true}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
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

export default Auction;
