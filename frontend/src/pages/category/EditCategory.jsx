import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths.js';
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import CategoryService from '../../services/category/CategoryService';

const EditCategory = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const { categoryID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getCategory({ id: categoryID })
            .then((res) => setFormData(res))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
    }, [categoryID])

    const handleInputChange = handleFieldChange(setFormData);

    const handleUpdateClick = async () => {
        try {
            await CategoryService.updateCategory(formData);
            setError('');
            navigate(paths.categories);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await CategoryService.deleteCategory({id: categoryID});
            setError('');
            navigate(paths.categories);
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
                        multiline={true}
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

export default EditCategory;
