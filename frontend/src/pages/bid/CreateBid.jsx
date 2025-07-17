import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths'
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import Loading from "../../components/Loading";
import LotService from '../../services/lot/LotService';
import BidService from '../../services/bid/BidService';
import CategoryService from "../../services/category/CategoryService";

const CreateBid = () => {
    const { lotID } = useParams();
    const [lot, setLot] = useState({
        id: 0,
        auctionId: 0,
        categoryId: 0,
        amount: 0,
        title: '',
        description: '',
    });
    const [categories, setCategories] = useState([{
        id: 0,
        title: '',
        description: '',
    }]);
    const [formData, setFormData] = useState({
        id: 0,
        lotId: lotID,
        userId: 0,
        amount: 0
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        LotService.getLot({ id: lotID })
            .then((data) => setLot(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });
    }, [lotID]);

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, [isLoading]);

    const handleInputChange = handleFieldChange(setFormData);

    const handleSaveClick = async () => {
        try {
            await BidService.createBid(formData);
            setError('');
            navigate(paths.auctions);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const categoryMap = useMemo(() => {
        const map = {};
        categories.forEach(cat => {
            map[cat.id] = cat.title;
        });
        return map;
    }, [categories]);

    if (isLoading) return <Loading />;

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <PaymentIcon sx={styles.avatarIcon} />
                </Avatar>
                <form>
                    <TextField
                        label="Title"
                        name="title"
                        value={lot.title}
                        onChange={handleInputChange}
                        disabled={true}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={lot.description}
                        onChange={handleInputChange}
                        disabled={true}
                        fullWidth
                        multiline={true}
                        margin="normal"
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={categoryMap[lot.categoryId] || '-'}
                        onChange={handleInputChange}
                        disabled={true}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Lot Amount"
                        name="lotAmount"
                        type="number"
                        value={lot.amount}
                        onChange={handleInputChange}
                        disabled={true}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bid Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </form>
                <div style={styles.flexCenter}>
                    <Button style={styles.createButton} onClick={handleSaveClick}>
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
};

export default CreateBid;
