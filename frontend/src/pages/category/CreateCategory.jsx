import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Avatar, Button, Grid, TextField} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths.js';
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import CategoryService from "../../services/category/CategoryService";

const CreateCategory = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = handleFieldChange(setFormData);

    const handleCreateClick = async () => {
        try {
            await CategoryService.createCategory(formData);
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

export default CreateCategory;
