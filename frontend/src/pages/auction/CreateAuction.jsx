import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths.js';
import {handleFieldChange} from '../../utils/formHandlers';
import {addTimezoneOffset, getInitialAuctionDates} from '../../utils/dateUtils';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import AuctionService from '../../services/auction/AuctionService';

const CreateAuction = () => {
    const { startDate, endDate } = getInitialAuctionDates();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: startDate,
        endDate: endDate
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = handleFieldChange(setFormData);

    const handleCreateClick = async () => {
        try {
            const normalizedFormData = {
                ...formData,
                startDate: addTimezoneOffset(formData.startDate),
                endDate: addTimezoneOffset(formData.endDate),
            };
            await AuctionService.createAuction(normalizedFormData);
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
                    <StoreIcon sx={styles.avatarIcon} />
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
                    <Button style={styles.createButton} onClick={handleCreateClick}>
                        Create
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

export default CreateAuction;
