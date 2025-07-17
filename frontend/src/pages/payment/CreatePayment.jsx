import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Avatar, Grid, TextField} from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';

import {styles} from '../../styles/formStyles';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import PaymentService from '../../services/payment/PaymentService';

const CreatePayment = () => {
    const [formData, setFormData] = useState({
        amount: 0,
        user: { username: '' },
    });
    const { lotID } = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        PaymentService.determinePayment({ lot: { id: lotID } })
            .then((data) => setFormData(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [lotID]);

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <PaymentIcon sx={styles.avatarIcon} />
                </Avatar>
                <form>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.user.username}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        value={formData.amount}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                </form>
                <ErrorSnackbar
                    open={snackbarOpen}
                    message={error}
                />
            </Grid>
        </Grid>
    );
};

export default CreatePayment;
