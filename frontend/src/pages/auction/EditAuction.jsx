import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths.js';
import {handleFieldChange} from '../../utils/formHandlers';
import {getInitialAuctionDates, toDatetimeLocal, toISOString} from '../../utils/dateUtils';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import AuctionService from '../../services/auction/AuctionService';

const EditAuction = () => {
    const { startDate, endDate } = getInitialAuctionDates();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: startDate,
        endDate: endDate
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const { auctionID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        AuctionService.getAuction({ id: auctionID })
            .then((res) => {
                setFormData({
                    ...res,
                    startDate: toDatetimeLocal(res.startDate),
                    endDate: toDatetimeLocal(res.endDate),
                });
            })
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [auctionID]);

    const handleInputChange = handleFieldChange(setFormData);

    const handleUpdateClick = async () => {
        try {
            const payload = {
                ...formData,
                startDate: toISOString(formData.startDate),
                endDate: toISOString(formData.endDate),
            };
            await AuctionService.updateAuction(payload);
            setError('');
            navigate(paths.auctions);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await AuctionService.deleteAuction({id: auctionID});
            setError('');
            navigate(paths.auctions);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <StoreIcon sx={styles.avatarIcon}/>
                </Avatar>
                <form>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
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
                        label="Start Date and Time"
                        name="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                    <TextField
                        label="End Date and Time"
                        name="endDate"
                        type="datetime-local"
                        value={formData.endDate}
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
                        onClick={handleUpdateClick}
                    >
                        Save
                    </Button>
                    <Button
                        sx={styles.deleteButton}
                        variant="contained"
                        color="error"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </Button>
                </div>
                <ErrorSnackbar
                    open={snackbarOpen}
                    message={error}
                />
            </Grid>
        </Grid>
    );
}

export default EditAuction;
