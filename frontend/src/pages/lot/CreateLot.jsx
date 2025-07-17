import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths'
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import CategoryService from '../../services/category/CategoryService';
import LotService from '../../services/lot/LotService';

const CreateLot = () => {
    const { auctionID } = useParams();
    const [formData, setFormData] = useState({
        id: 0,
        auctionId: auctionID,
        categoryId: 0,
        amount: 0,
        title: '',
        description: '',
    });
    const [categories, setCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });
    }, []);

    const handleInputChange = handleFieldChange(setFormData);

    const handleCreateClick = async () => {
        try {
            await LotService.createLot(formData);
            setError('');
            navigate(paths.auctionLots(auctionID));
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
                    <CategoryIcon sx={styles.avatarIcon} />
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
                        value={formData.amount}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                </form>
                <div style={styles.flexCenter}>
                    <Button className="MuiButton-root"
                            onClick={handleCreateClick}>
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

export default CreateLot;
