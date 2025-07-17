import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths'
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import CategoryService from '../../services/category/CategoryService';
import LotService from '../../services/lot/LotService';
import Loading from "../../components/Loading";

const EditLot = () => {
    const { lotID, auctionID } = useParams();
    const [formData, setFormData] = useState({
        id: lotID,
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        LotService.getLot({id: lotID})
            .then((data) => setFormData(data))
            .catch ((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [lotID]);

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch ((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleInputChange = handleFieldChange(setFormData);

    const handleUpdateClick = async () => {
        try {
            await LotService.updateLot(formData);
            setError('');
            navigate(paths.auctionLots(auctionID));
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await LotService.deleteLot(formData);
            setError('');
            navigate(paths.auctionLots(auctionID));
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <CategoryIcon sx={styles.avatarIcon}/>
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
                        multiline
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleInputChange}
                            label="Category"
                            variant="outlined"
                        >
                        <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Amount"
                        name="amount"
                        value={formData.amount || 0}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
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

export default EditLot;
